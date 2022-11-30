import { useEffect, useState } from "react";
import Autosuggest from "react-autosuggest";

const Filter2 = (props) => {

    const [suggestions, setsuggestions] = useState([])
    const [value, setvalue] = useState('');
    const [inputProps, setinputProps] = useState({
        placeholder: props.placeholder,
        value: '',
        onChange: null
    })
    const data = props.data

    useEffect(() => {
        setinputProps({
            placeholder: props.placeholder,
            value,
            onChange: onChange
          })
        
    },[value])

    const onSuggestionsFetchRequested = ({ value }) => {
        console.log(value)

   
        setsuggestions(getSuggestions(value))
      }
      
      const onSuggestionsClearRequested = () => {
        setsuggestions([])
        // this.setState({
        //   suggestions: []
        // })
      };

      function getSuggestionValue(suggestion) {
        return suggestion[props.placeArr]
      }

      function renderSuggestion(suggestion) {
        return (
            <span>{suggestion[props.placeArr]}</span>
        );
      }

    //   regex ---------------

    function escapeRegexCharacters(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      }

    function getSuggestions(value) {
        const escapedValue = escapeRegexCharacters(value.trim());
        
        if (escapedValue === '') {
          return [];
        }
      
        const regex = new RegExp('^' + escapedValue, 'i')

        let a = data.filter(function(item, pos) {
                return data.indexOf(item[props.placeArr]) == pos[props.placeArr];
            })
      
        return data.filter(item => regex.test(item[props.placeArr]))
      }

    // end regex -------------



      const onChange = (event, { newValue, method }) => {
        setvalue(newValue)
      }

  return (
    <>
        {/* <div className='center-position'> */}
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps} 
        />
        {/* </div>     */}
    </>
  );
}

export default Filter2;