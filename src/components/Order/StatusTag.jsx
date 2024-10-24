export const validStatus = {
  pending: "Chờ xác nhận",
  preparing: "Đang chuẩn bị",
  delivering: "Đang vận chuyển",
  completed: "Hoàn thành",
  canceled: "Đã hủy",
};

const StatusTag = ({ status = validStatus.pending }) => {
  return (
    <>
      {status === validStatus.pending && (
        <div className="rounded border-2 border-yellow-100 bg-yellow-50 px-6 py-1.5 font-medium text-yellow-400">
          {status}
        </div>
      )}

      {status === validStatus.preparing && (
        <div className="rounded border-2 border-blue-100 bg-blue-50 px-6 py-1.5 font-medium text-blue-400">
          {status}
        </div>
      )}

      {status === validStatus.delivering && (
        <div className="rounded border-2 border-orange-100 bg-orange-50 px-6 py-1.5 font-medium text-orange-400">
          {status}
        </div>
      )}

      {status === validStatus.completed && (
        <div className="rounded border-2 border-green-100 bg-green-50 px-6 py-1.5 font-medium text-green-400">
          {status}
        </div>
      )}

      {status === validStatus.canceled && (
        <div className="rounded border-2 border-red-100 bg-red-50 px-6 py-1.5 font-medium text-red-400">
          {status}
        </div>
      )}
    </>
  );
};

export default StatusTag;
