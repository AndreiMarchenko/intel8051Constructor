import './ToolsList.css';
import SaveState from "./tools/saveState/SaveState";
import DeleteState from "./tools/deleteState/DeleteState";
import Delete from "./tools/delete/Delete";

export default function ToolsList() {
    const tools = [
        <SaveState key={1} />,
        <DeleteState key={2} />,
        <Delete key={3} />
    ];

    return (
        <div className="tools-list">
            { tools }
        </div>
    );
}