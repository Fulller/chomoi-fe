const STATUS_ACTIONS = {
  DRAFT: {
    title: "Nháp",
    actions: [
      {
        title: "Yêu cầu duyệt",
        status: "PENDING",
      },
    ],
  },
  REJECTED: {
    title: "Bị từ chối",
    actions: [],
  },
  PENDING: {
    title: "Đang chờ duyệt",
    actions: [
      {
        title: "Chuyển sang nháp",
        status: "DRAFT",
      },
    ],
  },
  ACTIVE: {
    title: "Đang bán",
    actions: [
      {
        title: "Chuyển sang nháp",
        status: "DRAFT",
      },
    ],
  },
};

export { STATUS_ACTIONS };
