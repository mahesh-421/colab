import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ColabControlers from '../ColabControlers';

import throttle from '../../../hooks/utils/throttle';
import useListenCode from '../../../hooks/connections/colabRoom/useListenForCode';
import useSetNewCode from '../../../hooks/connections/colabRoom/useSetNewCode';

import {
  addAllCodes,
  changeBroadcastCodes,
} from '../../../utils/redux/compilerSlice';

import { CODE_SNIPPETS } from '../../../components/colab/compiler/constants';

import CodeArea from './components/CodeArea';
import RunCode from './components/RunCode';
import LanguageSelector from './components/LanguageSelector';
import Output from './components/Output';

const Compiler = () => {
  const editorRef = useRef();
  const [isError, setIsError] = useState(false);
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');
  const [inputs, setInputs] = useState('');
  const broadcastInput = useRef();
  const [code, setCode] = useState(CODE_SNIPPETS['javascript']);

  const compilerData = useSelector((store) => store.compilerdata);
  const dispatch = useDispatch();
  useListenCode(); // listening for new codes from server
  useSetNewCode(setInputs, setOutput, setCode, setIsError, language, isError); // it only sets new codes

  const onSelect = (lang) => {
    //
    // Saving all the code to redux store on language change

    const allCodes = compilerData.codes.map((obj) => {
      if (obj.language === language) {
        return { ...obj, code: `${code}`, inputs: `${inputs}` };
      }
      return obj;
    });

    dispatch(addAllCodes(allCodes));

    // loading all the code from store of required language
    setLanguage(lang);

    const getScreenCode = compilerData.codes.find(
      (obj) => obj.language === lang
    );

    setCode(getScreenCode.code);

    setInputs(getScreenCode.inputs);
  };

  ///

  //----------------------------------------------------Throtelling--------------------------------------------------------

  let allCodes = compilerData.codes;

  const throttleCode = useCallback(
    throttle((inputs, language, allCodes) => {
      //

      allCodes = allCodes.map((obj) => {
        if (obj.language === language) {
          return { ...obj, inputs: `${inputs}` };
        }
        return obj;
      });

      //saving current input to redux
      dispatch(addAllCodes(allCodes));

      //Broadcast current input to server
      dispatch(changeBroadcastCodes());
      //

      //reseting broadcastInput
      broadcastInput.current = false;
    }, 150),
    []
  );

  useEffect(() => {
    if (broadcastInput.current) throttleCode(inputs, language, allCodes);
  }, [inputs]);

  ////

  return (
    <div className="relative w-full h-full">
      <div className="absolute mt-1 z-20 h-12 w-[70%] flex justify-between">
        <div className="relative flex justify-between w-full my-0.5 mx-4">
          <LanguageSelector language={language} onSelect={onSelect} />
          <RunCode
            editorRef={editorRef}
            language={language}
            setIsError={setIsError}
            setOutput={setOutput}
            inputs={inputs}
          />
        </div>
      </div>
      <div className="absolute z-10 flex w-full h-[94%] mt-12  px-2 py-2">
        <div className=" w-[70%] mx-0.5">
          <div className="h-full p-1 rounded-lg border-2 border-gray-500">
            <CodeArea
              editorRef={editorRef}
              code={code}
              setCode={setCode}
              language={language}
            />
          </div>
        </div>

        <div className=" w-[30%] mx-0.5">
          <div className="w-full h-[50%]  border-2 rounded-lg">
            <textarea
              className="resize-none focus:outline-none p-4 text-white text-xl bg-[#1E1E1E] h-full w-full rounded-lg"
              name="Input"
              placeholder="Input"
              onFocus={(e) => (e.target.placeholder = '')}
              onBlur={(e) => (e.target.placeholder = 'Input')}
              value={inputs}
              onChange={(e) => {
                broadcastInput.current = true;
                setInputs(e.target.value);
              }}
            ></textarea>
          </div>
          <div className="w-full h-[50%] border-2 rounded-lg">
            <Output isError={isError} output={output} />
          </div>
        </div>
      </div>
      <ColabControlers />
    </div>
  );
};

export default Compiler;
