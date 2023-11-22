import React, { useContext, useState } from 'react'
import {ReactComponent as SearchIcon} from '../images/search2.svg';
import { ProductContext } from '../context/product-context';
import { getRoute } from '../services/routes.service';
import { useNavigate } from 'react-router';
import { ALL_DATA } from '../data/all_data';
import { ReactComponent as DeleteIcon } from '../images/cancel.svg';
import { debounce } from 'lodash';
import { translateText } from '../services/translation.service';

const SearchField = () => {
  const { search } = useContext(ProductContext);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [inputValue, setInputValue] = React.useState('');
  const navigate = useNavigate();

  const debouncedSetSuggestions = debounce((query) => {
    const filteredSuggestions = Array.from(
      new Set(
        ALL_DATA.map((a) => a.labelName).filter((example) =>
          example.toLowerCase().includes(query.toLowerCase())
        )
      )
    );
    setSuggestions(filteredSuggestions);
  }, 1000);

  const handleInputChange = (query) => {
    setInputValue(query);
    if (query === '') {
      setSuggestions([]);
    } else {
      search(query);
      debouncedSetSuggestions(query);
    }
  };

  const handleSuggest = (query) => {
    setInputValue(query);
  }
  
  const handleClearAll = () => {
    setSuggestions([]);
    setInputValue('');
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    navigate(getRoute(`search`))
  }
  
  return (
    <div className='relative'>
      <div className={`w-[450px] flex items-center border border-[#ccc] bg-white ${suggestions.length > 0 ? 'rounded-t-3xl' : 'rounded-3xl'} py-1 text-[#000]`}>
        <form role='search' onSubmit={handleSubmit} className='flex items-center'>
          <input
            value={inputValue}
            autoComplete='off'
            type="text" 
            id="searchInput" 
            className='py-2 px-4 w-[350px] bg-transparent focus:outline-none focus:border-none rounded-3xl'
            placeholder={translateText('search input label|A')}
            aria-label={translateText('search input label|A')}
            onChange={(event) => handleInputChange(event.target.value)}
          />
          {suggestions.length > 0 ? <DeleteIcon className='pr-2 w-[35px]' onClick={handleClearAll}/> : <div className='w-[35px]'/>}
        </form>
        <div className='bg-[#ccc] w-[1px] h-[30px] '/>
        <span className='pr-5 pl-4' onClick={() => navigate(getRoute(`search`))}>
          <SearchIcon/>
        </span>
      </div>
      {suggestions.length > 0 ? (
        <div className='absolute max-h-[160px] w-full overflow-y-auto bg-[#ffffff5e]  rounded-b-3xl backdrop-blur-md'>
          {suggestions.map((suggestion, index) => (
            <div key={index} className='px-2.5 py-1 text-[#bebebe] hover:bg-[#4a4a4a5e] duration-200' onClick={() => handleSuggest(suggestion)}>
              {suggestion}
            </div>
          ))}
        </div>
      ) : <></>}
    </div>
  )
}

export default SearchField