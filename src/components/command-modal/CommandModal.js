import './commandModal.css';
import {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {closeCommandModal} from "../../store/slices/commandSlice";
import {setGlobalSignalOnes, setCommands, setCommandsAmount, changeCommandCode} from "../../store/slices/blockSlice";
import {useEffect} from "react";
import { range, difference, cloneDeep } from 'lodash';
import fromHex from "../../utils/fromHex";
import toHex from "../../utils/toHex";

export default function CommandModal() {
    const globalSignals = useSelector(state => state.blockReducer.globalSignals);
    const commands = useSelector(state => state.blockReducer.commands);
    const commandAmount = useSelector(state => state.blockReducer.commandsAmount);
    const dispatch = useDispatch();

    const [localCommandAmount, setLocalCommandAmount] = useState(commandAmount);

    let isOpened = useSelector(state => state.commandReducer.isCommandModalOpened);
    const closeModal = () => {
        dispatch(closeCommandModal());
    };

    let [commandCodes, setCommandCodes] = useState([]);

    useEffect(() => {
        const commandsCodes = commands.map(command => {
            return toHex(command.commandCode);
        });
        setCommandCodes(commandsCodes);
    }, []);

    useEffect(() => {
        if (commands.length > commandAmount) {
            dispatch(setCommands(commands.slice(0, commandAmount)));
        } else {
            const newCommands = [];
            for (let i = 0; i < commandAmount - commands.length; i++) {
                newCommands.push({
                    name: '',
                    commandCode: i,
                    length: 10,
                });
            }
            setCommandCodes([...commands, ...newCommands].map((command, i) => command.commandCode === '' ? i : command.commandCode))


            dispatch(setCommands([...commands, ...newCommands]));
        }
    }, [commandAmount]);

    const handleSignalEdgeInput = (event, signal, edgeNumber, commandIndex) => {
        if (+event.currentTarget.textContent === 1) {
            const clonedOnes = cloneDeep(signal.commands[commandIndex].ones);
            clonedOnes.push(edgeNumber)
            dispatch(setGlobalSignalOnes({
                commandCode: commands[commandIndex].commandCode,
                blockId: signal.blockId,
                ones: clonedOnes.sort((a, b) => a - b),
            }));
        } else if (+event.currentTarget.textContent === 0) {
            dispatch(setGlobalSignalOnes({
                commandCode: commands[commandIndex].commandCode,
                blockId: signal.blockId,
                ones: difference(signal.commands[commandIndex].ones, [edgeNumber]),
            }));
        }
    };

    const handleLocalCommandAmountChange = event => {
        setLocalCommandAmount(event.target.value);
    };

    const handleCommandAmountChange = () => {
        dispatch(setCommandsAmount(localCommandAmount));
    };

    const handleCommandSettingsChange = (event, commandIndex) => {
        const parentNode = event.target.parentNode;

        const nameInput = parentNode.querySelector('.name-input');
        const codeInput = parentNode.querySelector('.code-input');
        const lengthInput = parentNode.querySelector('.length-input');

        const commandsCopy = cloneDeep(commands);
        const commandToChange = commandsCopy[commandIndex];
        commandToChange.name = nameInput.value;

        const commandCodesCopy = cloneDeep(commandCodes);
        commandCodesCopy[commandIndex] = codeInput.value;
        setCommandCodes(commandCodesCopy);

        commandToChange.length = +lengthInput.value;

        dispatch(setCommands(commandsCopy));
        dispatch(changeCommandCode({commandCode: fromHex(codeInput.value), commandIndex: commandIndex}));
    };

    return (
        <div className={`command-modal ${isOpened ? 'command-modal_opened' : ''}`}>
            <div className="close-cross" onClick={closeModal} />
            <div className="command-modal__content">
                <label className="commands-amount-label">
                    Commands amount
                    <input type="text" className="commands-amount-input" value={localCommandAmount} onChange={handleLocalCommandAmountChange}/>
                    <button className="commands-amount-btn" onClick={handleCommandAmountChange}>Change command amount</button>
                </label>
                {
                    commands.map((command, commandIndex) => {
                        return (
                            <div className="command-content" key={commandIndex}>
                                <label className={'command-name-label'}>
                                    Command name
                                    <input
                                        className="command-input name-input"
                                        type="text"
                                        defaultValue={command.name}
                                    />
                                </label>
                                <label className={'command-name-label'}>
                                    Command code
                                    <input
                                        className="command-input code-input"
                                        type="text"
                                        defaultValue={toHex(commandCodes[commandIndex])}
                                    />
                                </label>
                                <label>
                                    Command length
                                    <input
                                        className="command-input length-input"
                                        type="text"
                                        defaultValue={command.length}
                                    />
                                </label>
                                <button className="command-settings-btn" onClick={(e) => handleCommandSettingsChange(e, commandIndex)}>
                                    Change command settings
                                </button>
                                <div className="command-modal__table">
                                    <div className="signals-column">
                                        {
                                            globalSignals.map((signal, index) => {
                                                return <div className="signal-row" key={index}>
                                                    { signal.name }
                                                </div>;
                                            })
                                        }
                                    </div>
                                    <div className="values">
                                        <div className="values-head-row">
                                            {
                                                range(1, +command.length + 1).map((edgeNumber, index) => {
                                                    return <div className="head-cell cell" key={index}>
                                                        { edgeNumber }
                                                    </div>
                                                })
                                            }
                                        </div>
                                        <div className="values-rows">
                                            {
                                                globalSignals.map((signal, index) => {
                                                    return <div className="values-row" key={index}>
                                                        {
                                                            range(1, +command.length + 1).map((edgeNumber, index2) => {
                                                                return (
                                                                    <div
                                                                        className="cell"
                                                                        contentEditable={true}
                                                                        suppressContentEditableWarning={true}
                                                                        onInput={event => handleSignalEdgeInput(event, signal, edgeNumber, commandIndex)}
                                                                        key={`${index} ${index2}`}
                                                                    >
                                                                        {
                                                                            signal.commands?.find(signalCommand => signalCommand.commandCode === command.commandCode).ones.includes(edgeNumber)
                                                                                ? 1
                                                                                : 0
                                                                        }
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};