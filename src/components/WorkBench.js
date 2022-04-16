import Field from "./field/Field";
import TopPanel from "./top-panel/TopPanel";
import Sidebar from "./sidebar/Sidebar";
import CommandModal from "./command-modal/CommandModal";


export default function WorkBench() {
    return (
        <div>
            <CommandModal />
            <TopPanel />
            <Sidebar />
            <Field />
        </div>
    );
}