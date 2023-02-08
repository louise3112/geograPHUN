import { randomCountries, randomIndex, getLanguageForQuestion } from "../../helpers/usefulFunctions"
import { getAllCountries } from "../../helpers/countryDataFetches"
import React, { useState, useEffect } from "react"
import QuizList from "../../components/QuizList"
import styled from "styled-components"
import '../../App.js'

const Container = styled.div`
display: flex;
flex-direction: column;
min-height: 100vh;
`

const Text = styled.h3`
text-align: center;
margin: 0;
padding: 6px; 
`

const Header = styled.h1`
position: relative;
text-align: center;
font-family: 'Oswald', sans-serif;
font-size: 2.5em;
margin:4px;
`

const Quiz = ({gameType}) => {
    const [answerOptions, setAnswerOptions] = useState([])

    // Maps over the random country array to create a new array with the data we need
    const prepAnswers = (countriesArray) => {
        const randomCountriesArray = randomCountries(countriesArray, 3) // Selects 3 random country objects and puts them in an array
        let indexOfLanguage = -1 // undefined  // Because any number 0 or more could be an array index
        if(gameType == "Language") {
            const languageInSingleCountry = getLanguageForQuestion(randomCountriesArray) // ["English", [{countryObj.name}]]
            if(!languageInSingleCountry) {
                // All options have repeated langauges
                processRefresh()
            }
            
            for(let i=0; i< randomCountriesArray.length; i++) {
                if(languageInSingleCountry[1][0].name == randomCountriesArray[i].name) { 
                    indexOfLanguage = i
                    break;
                }
            }
        }
        const correctAnswerIndex = (gameType=="Flag")?randomIndex(randomCountriesArray.length):indexOfLanguage
        const answersList = randomCountriesArray.map((country, index) => {
            return {
                ...country,
                isCorrect: index === correctAnswerIndex
            }
        }
        )
        return answersList
    }

    const [userCorrect, setUserCorrect] = useState(false)
    const [hasUserAnswered, sethasUserAnswered] = useState(false)
    const [score, setScore] = useState(0)
    const [highScore, setHighScore] = useState(0)

    const processGuess = (result) => {
        setScore(result ? score + 1 : 0)
        if (result && score + 1 > highScore) {
            setHighScore(score + 1)
        }
        setUserCorrect(result)
        sethasUserAnswered(true)
    }

    const processRefresh = () => {
        getAllCountries()
            .then(allCountries => {
                const selectedAnswers = prepAnswers(allCountries)
                setAnswerOptions(selectedAnswers)
                setUserCorrect(false)
                sethasUserAnswered(false)
            })
    }

    useEffect(() => {
        getAllCountries()
            .then(allCountries => {
                const selectedAnswers = prepAnswers(allCountries)
                setAnswerOptions(selectedAnswers)
            })
    }, [])


    return (
        <Container>
            <Header>{gameType} Quiz</Header>
            <Text>Guess what country's {gameType.toLowerCase()} this is. Choose from one of the three options below.</Text>
            <QuizList answerOptions={answerOptions} processGuess={processGuess}
                hasUserAnswered={hasUserAnswered} userCorrect={userCorrect}
                processRefresh={processRefresh} score={score}
                highScore={highScore} gameType={gameType}/>
        </Container>
    )

}


export default Quiz