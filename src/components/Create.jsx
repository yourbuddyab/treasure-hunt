import React, { useState, useEffect } from 'react';

export default function Create() {
    const [formData, setFormData] = useState({
        user_name: '',
        size: ''
    });
    const [errorMessage, setErrorMessage] = useState({
        user_name: '',
        size: '',
        error: ''
    });
    const [grid, setGrid] = useState(0);
    const [gridState, setGridState] = useState([]);
    const [treasures, setTreasures] = useState([]);
    const [treasuresFound, setTreasuresFound] = useState(0);
    const [misses, setMisses] = useState(0);

    useEffect(() => {
        const totalCount = Object.keys(treasures).length;
        const maxMisses = formData.size * (formData.size - 1);
        if (formData.size !== 0) {
            if (treasuresFound === totalCount && treasuresFound !== 0) {
                alert(`${formData.user_name}, great job! You've found all the treasures!`);
                gridReset();
                return;
            }

            if (misses === maxMisses && misses !== 0) {
                alert(`${formData.user_name}, oh no, you missed! Better luck next time!`);
                gridReset();
            }
        }

    }, [treasuresFound, misses])

    const gridReset = () => {
        setTreasuresFound(0);
        setMisses(0);
        setGridState(0);
        setGrid(0);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name == "size" && value > 14 ) {
            alert("The maximum value allowed is 14. You cannot select more than this.");
            return;
        }
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        gridReset();
        try {
            const newTreasures = {};
            for (let i = 0; i < formData.size; i++) {
                let x, y;
                do {
                    x = Math.floor(Math.random() * formData.size);
                    y = Math.floor(Math.random() * formData.size);
                } while (`${x},${y}` in newTreasures);

                newTreasures[`${x},${y}`] = true;
            }
            setTreasures(newTreasures);
            setGrid(parseInt(formData.size));
            setGridState(Array(parseInt(formData.size)).fill().map(() => Array(parseInt(formData.size)).fill(null)));
        } catch (error) {
            setErrorMessage({ error: 'An error occurred while submitting the form.' });
        }
    };

    const handleResult = (i, ii) => {
        if (gridState[i][ii] !== null) return;

        const key = `${i},${ii}`;
        if (treasures[key]) {

            setGridState((prevState) => {
                const newState = [...prevState];
                newState[i][ii] = 'treasure';
                return newState;
            });
            setTreasuresFound(treasuresFound + 1);
        } else {

            setGridState((prevState) => {
                const newState = [...prevState];
                newState[i][ii] = 'miss';
                return newState;
            });
            setMisses(misses + 1);
        }
    };


    return (
        <>
            <div className='game-container'>
                {/* Game Background */}
                <div className='game-background'>
                    {/* Form Section */}
                    <div className='row justify-content-center'>
                        <form onSubmit={handleFormSubmit} method='post' className='row col-md-8 form-container'>
                            {/* Name Field */}
                            <div className='col-md-4'>
                                <label htmlFor='name' className='form-label'>Name</label>
                                <input
                                    type='text'
                                    name='user_name'
                                    id='name'
                                    value={formData.user_name}
                                    onChange={handleChange}
                                    className='form-control input-glow'
                                    placeholder='Enter Your Name'
                                />
                                {errorMessage.user_name && <p className='text-danger'>{errorMessage.user_name}</p>}
                            </div>

                            {/* Grid Size Field */}
                            <div className='col-md-4'>
                                <label htmlFor='grid' className='form-label'>Grid</label>
                                <input
                                    type='number'
                                    name='size'
                                    id='grid'
                                    value={formData.size}
                                    max={14}
                                    min={2}
                                    onChange={handleChange}
                                    className='form-control input-glow'
                                    placeholder='Enter grid count Ex: 5 and Max grid 14'
                                />
                                {errorMessage.size && <p className='text-danger'>{errorMessage.size}</p>}
                            </div>

                            {/* Submit Button */}
                            <div className='col-md-4 d-flex align-items-end'>
                                <button className='btn btn-primary btn-game w-100'>Start</button>
                            </div>
                        </form>
                    </div>

                    {/* Grid Section */}
                    <div className='row justify-content-center mt-5'>
                        <div className='col-md-8'>
                            <div className='row'>
                                {
                                    [...Array(grid)].map((_, i) => (
                                        <div className='d-flex justify-content-center mb-1' key={i}>
                                            {
                                                [...Array(grid)].map((_, ii) => (
                                                    <button
                                                        type='button'
                                                        key={ii}
                                                        className={`btn btn-game ${gridState[i][ii] === 'treasure' ? 'btn-success' : gridState[i][ii] === 'miss' ? 'btn-danger' : 'btn-primary'} p-4 m-1`}
                                                        onClick={() => handleResult(i, ii)}
                                                    >
                                                        {gridState[i][ii] === 'treasure' ? '💰' : gridState[i][ii] === 'miss' ? '❌' : '❓'}
                                                    </button>
                                                ))
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>

                    {/* Results Section */}
                    <div className='row justify-content-center mt-3'>
                        <div className='col-md-8 text-center'>
                            <p className='result-text'><strong>Treasures Found:</strong> {treasuresFound}</p>
                            <p className='result-text'><strong>Misses:</strong> {misses}</p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
