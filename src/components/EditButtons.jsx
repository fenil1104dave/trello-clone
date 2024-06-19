import { Button } from "./ui/button";

const EditButtons = ({
  handleSave,
  saveLabel,
  handleDelete,
  handleCancel,
  cardText,
}) => {
  return (
    <div className="flex items-center justify-center gap-2 my-3">
      <Button
        size="small"
        className="py-2 px-3"
        onClick={handleSave}
        disabled={!cardText}
      >
        {saveLabel}
      </Button>
      <Button size="small" className="py-2 px-3" onClick={handleCancel}>
        Cancel
      </Button>
    </div>
  );
};

export default EditButtons;
