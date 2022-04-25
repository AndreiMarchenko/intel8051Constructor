import './ToolsList.css';
import SaveState from "./tools/saveState/SaveState";
import LoadState from "./tools/loadState/LoadState";
import ClearField from "./tools/clearField/ClearField";
import Delete from "./tools/delete/Delete";

export default function ToolsList() {
    const tools = [
        <SaveState key={1} />,
        <LoadState key={2} />,
        <ClearField key={3} />,
        <Delete key={4} />
    ];

    return (
        <div className="tools-list">
            { tools }
        </div>
    );
}