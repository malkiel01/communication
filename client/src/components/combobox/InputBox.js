import { useEffect, useState } from "react"
import Autosuggest from "react-autosuggest"

const InputBox = (props) => {

    const [suggestions, setsuggestions] = useState([])
    const [value, setvalue] = useState('');
    const [inputProps, setinputProps] = useState({
      placeholder: props.placeholder,
      value: '',
      onChange: null
  })   
    

    const data = ['jerusalem', 'jer', 'tel', 'telaviv']

    useEffect(() => {
        setinputProps({
            placeholder: props.placeholder,
            value,
            onChange: onChange,
            onBlur: onBlur
          })
        
    },[value])

    const onSuggestionsFetchRequested = ({ value }) => {
        // if(props.result(value)) {
        //   console.log('ok')
        // }
        setsuggestions(getSuggestions(value))
      }
      
      const onSuggestionsClearRequested = () => {
        setsuggestions([])
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

      //   let a = data.filter(function(item, pos) {
      //           return data.indexOf(item[props.placeArr]) == pos[props.placeArr];
      //       })
      // console.log(a);
        return data.filter(item => regex.test(item[props.placeArr]))
      }

    // end regex -------------



    const onChange = (event, { newValue, method }) => {
      setvalue(newValue)
    }
    const onBlur = (e) => {
        if(props.result !== undefined && props.result(e.target.value)) {
          console.log('ok')
        } else {
          console.log('not ok')
        }
    }

  return (
    <>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps} 
        />
    </>
  );
}


export default InputBox;