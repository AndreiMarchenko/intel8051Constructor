import './blocks-list.css';
import Register from "./blocks/register/Register";
import Inc from "./blocks/inc/Inc";

export default function BlocksList() {
    const blocks = [
        <Register key={1} />,
        <Inc key={2} />
    ];


    return (
        <div className='blocks-list'>
            { blocks }
        </div>
    );
}