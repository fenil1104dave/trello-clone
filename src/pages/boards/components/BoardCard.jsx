const BoardCard = ({ title, color }) => {
  return (
    <div style={{ background: color }} className="boards-card p-2.5 rounded-lg">
      <div className="text-white truncate font-bold text-base mb-2">
        {title}
      </div>
    </div>
  );
};

export default BoardCard;
