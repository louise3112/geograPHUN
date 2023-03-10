// Selects a random index from a given total of indexes:
export const randomIndex = (totalOptions) => {
    return Math.floor(Math.random() * totalOptions)
}

// Selects a random array of n countries:
export const randomCountries = (array, n) => {
    const selected = []
    const remaining = [...array]

    for (let i = 0; i < n; i++) {
        let index = randomIndex(remaining.length)
        selected.push(remaining[index])
        remaining.splice(index, 1)
    }
    
    return selected
}

export const getLanguageForQuestion = function (listOfRandomCountries) {
    /*
    1- get n countries
    2- build a language to countries dictionary === new dictionary 
    3- filter any language in multiple country
    5- return random language for question === answer
    */
    const languageToCountriesDict = {}
    for (let i = 0; i < listOfRandomCountries.length; i++) {
        const country = listOfRandomCountries[i] // object
        const languages = Object.values(country.language) // to convert object to array
        for (let j = 0; j < languages.length; j++)  {
            const language = languages[j]
            // if language in dictionary
            if (language in languageToCountriesDict) {
                languageToCountriesDict[language].push(country)
            }
            else {
                languageToCountriesDict[language] = [country]
            }
        }
    }
    const languageInSingleCountry = (Object.entries(languageToCountriesDict)).filter(([language, countries]) => countries.length === 1)
    if (languageInSingleCountry.length === 0) {
        return undefined
    }
    else {
        return languageInSingleCountry[randomIndex(languageInSingleCountry.length)]
    }
}