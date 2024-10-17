import { useState } from "react";
import AuthService from "@services/auth.service";

function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!currentPassword || !newPassword) {
            setError("Both fields are required.");
            setSuccessMessage(null);
            return;
        }

        setError(null);
        setSuccessMessage(null);

        try {
            const [response, apiError] = await AuthService.changePassword({
                currentPassword,
                newPassword
            });

            if (apiError) {
                setError(apiError.message || "An unexpected error occurred.");
                setSuccessMessage(null);
                return;
            }

            setSuccessMessage("Password changed successfully.");
            setError(null);
            setCurrentPassword("");
            setNewPassword("");

        } catch (err) {
            setError(err.response?.data?.message || err.message || "An unexpected error occurred.");
            setSuccessMessage(null);
        }
    }

    return (
        <div>
            <h2>Change Password page</h2>
            
            {error && <div style={{ color: "red" }}>{error}</div>}

            {successMessage && <div style={{ color: "green" }}>{successMessage}</div>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Current Password</label>
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                </div>

                <div>
                    <label>New Password</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>

                <button type="submit">Change Password</button>
            </form>
        </div>
    );
}

export default ChangePassword;





