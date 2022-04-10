import Field from "./field/Field";
import TopPanel from "./top-panel/TopPanel";
import ControlUnit from "./ControlUnit";
import Sidebar from "./sidebar/Sidebar";


export default function WorkBench() {
    return (
        <div>
            <TopPanel />
            <Sidebar />
            <Field />
            <ControlUnit />
        </div>
    );
}