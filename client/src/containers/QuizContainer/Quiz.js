import React, { useEffect, useState } from "react";
import { getAllCountries } from "../../helpers/countryDataFetches";
import styled from "styled-components";
import Capitals from '../images/Capitals.jpg'

const Spacer = styled.div`
margin-top: 1em;
`;

const Container = styled.div`
border-bottom-right-radius:10px;
border-bottom-left-radius: 10px; 
display: flex; 
align-items: center; 
justify-content: center; 
width: 29.9em;
margin: auto;
background-color: #96bcb4;
`;

const CapitalPhoto = styled.img`
border-top-right-radius: 10px; 
border-top-left-radius: 10px; 
background-color:#96bcb4;
margin: 2em 0;
padding: 0.9em; 
display: block;
margin: 0 auto;
max-width: 100%;
`
const Input = styled.input`
width: 70%;
`


const CountriesQuiz = () => {
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [country, setCountry] = useState({});
    const [userGuess, setUserGuess] = useState("");
    const [isCorrect, setIsCorrect] = useState(null);
    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(() => {
        getAllCountries().then(data => {
            setCountries(data);
            setFilteredCountries(data);
            const randomIndex = Math.floor(Math.random() * data.length);
            const selectedCountry = data[randomIndex];
            setCountry(selectedCountry);
        });
    }, []);

    useEffect(() => {
        if (userGuess.length >= 2) {
            setFilteredCountries(
                countries.filter(
                    country =>
                        country.name.toLowerCase().indexOf(userGuess.toLowerCase()) !==
                        -1
                )
            );
        } else {
            setFilteredCountries([]);
        }
    }, [userGuess]);

    const handleGuess = evt => {
        setUserGuess(evt.target.value);
    };

    const handleCountryClick = countryName => {
        setUserGuess(countryName);
    };

    const handleSubmit = event => {
        event.preventDefault();
        setIsCorrect(userGuess === country.name);
        setFormSubmitted(true);
    };

    return (
        <>
        <Spacer />
        <CapitalPhoto className='Capitals' src={Capitals} alt='Capitals' />
        <Container>
            <form onSubmit={handleSubmit}>
                <h4>
                    <p>{country.capital} is the capital of which country?</p>
                    <Input type="text" value={userGuess} onChange={handleGuess} />
                    <button type="submit">Submit</button>
                    {formSubmitted && !isCorrect && (
                        <p>Incorrect. The correct answer is: {country.name}</p>
                    )}
                    {formSubmitted && isCorrect && <p>Correct!</p>}
                </h4>
                <div style={{ display: userGuess.length > 0 ? "block" : "none" }}>
                    {filteredCountries.map(country => (
                        <p key={country.alpha3Code} onClick={() => handleCountryClick(country.name)}>
                            {country.name}
                        </p>
                    ))}
                </div>
            </form>
        </Container>
        </>
    );
};

export default CountriesQuiz;
