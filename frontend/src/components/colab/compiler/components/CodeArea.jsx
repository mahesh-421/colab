import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Editor } from '@monaco-editor/react';

import throttle from '../../../../hooks/utils/throttle';

import {
  addAllCodes,
  changeBroadcastCodes,
} from '../../../../utils/redux/compilerSlice';

const CodeArea = ({ editorRef, code, setCode, language }) => {
  const broadcastCode = useRef();

  const dispatch = useDispatch();
  const compilerData = useSelector((store) => store.compilerdata);

  const currentCode = compilerData.codes.find(
    (obj) => obj.language === language
  )?.code;

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  ///

  //----------------------------------------------------Throtelling--------------------------------------------------------

  let allCodes = compilerData.codes;

  const throttleCode = useCallback(
    throttle((code, language, allCodes) => {
      //

      allCodes = allCodes.map((obj) => {
        if (obj.language === language) {
          return { ...obj, code: `${code}` };
        }
        return obj;
      });

      //saving current input to redux
      dispatch(addAllCodes(allCodes));
      //

      //Broadcast current code to server
      dispatch(changeBroadcastCodes());
      //

      //Reseting BroadcastCode
      broadcastCode.current = false;
    }, 150),
    []
  );

  useEffect(() => {
    if (broadcastCode.current) throttleCode(code, language, allCodes);
  }, [code]);

  ////

  return (
    <Editor
      options={{
        minimap: {
          enabled: false,
        },
      }}
      theme="vs-dark"
      language={language}
      defaultValue={currentCode}
      onMount={onMount}
      value={code}
      onChange={(code) => {
        broadcastCode.current = true;
        setCode(code);
      }}
    />
  );
};
export default CodeArea;
