import './ToolsList.css';
import Delete from "./tools/delete/Delete";

export default function ToolsList() {
    const tools = [
        <Delete key={1} />
    ];

    return (
        <div className="tools-list">
            { tools }
        </div>
    );
}