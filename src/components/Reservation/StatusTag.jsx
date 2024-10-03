const validStatus = {
  pending: "Chờ xác nhận",
  confirmed: "Đã xác nhận",
  completed: "Hoàn thành",
  canceled: "Đã hủy",
};

const StatusTag = ({ status = validStatus.pending }) => {
  return (
    <>
      {status === validStatus.pending && (
        <div className="px-6 py-1.5 bg-yellow-50 rounded border-2 border-yellow-100 text-yellow-400 font-medium">
          {status}
        </div>
      )}

      {status === validStatus.confirmed && (
        <div className="px-6 py-1.5 bg-blue-50 rounded border-2 border-blue-100 text-blue-400 font-medium">
          {status}
        </div>
      )}

      {status === validStatus.confirmed && (
        <div className="px-6 py-1.5 bg-green-50 rounded border-2 border-green-100 text-green-400 font-medium">
          {status}
        </div>
      )}

      {status === validStatus.canceled && (
        <div className="px-6 py-1.5 bg-red-50 rounded border-2 border-red-100 text-red-400 font-medium">
          {status}
        </div>
      )}
    </>
  );
};

export default StatusTag;
