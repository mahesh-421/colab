import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { Button } from '@chakra-ui/react';
import useRunCode from '../../../../hooks/connections/colabRoom/useRunCode';

import {
  addAllCodes,
  changeBroadcastCodes,
} from '../../../../utils/redux/compilerSlice';

const RunCode = ({ editorRef, language, inputs, setIsError, setOutput }) => {
  const [isLoading, setIsLoading] = useState(false);

  const compilerData = useSelector((store) => store.compilerdata);

  const runcode = useRunCode();
  const dispatch = useDispatch();

  const handleRunCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode.trim()) {
      toast.error('Please Write Valid Code');
      return;
    }
    try {
      setIsLoading(true);
      const { run: result } = await runcode(language, sourceCode, inputs);
      // console.log(result);

      setOutput(result.output.split('\n'));
      result.stderr ? setIsError(true) : setIsError(false);

      //
      //
      //--------------------------------------------------------Broadcasting Codes-----------------------------------------

      const output = result.output.split('\n');
      const isError = result.stderr ? true : false;

      // console.log(isError);
      const allCodes = compilerData.codes.map((obj) => {
        if (obj.language === language) {
          return {
            ...obj,
            output: output,
            isError: isError,
          };
        }
        return obj;
      });

      //saving current input to redux
      dispatch(addAllCodes(allCodes));
      dispatch(changeBroadcastCodes());

      //
      //
    } catch (error) {
      console.log(error);
      toast('unable to run the code');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <Button
        variant="outline"
        colorScheme="blue"
        mb={4}
        isLoading={isLoading}
        onClick={handleRunCode}
      >
        Run Code
      </Button>
    </div>
  );
};

export default RunCode;
