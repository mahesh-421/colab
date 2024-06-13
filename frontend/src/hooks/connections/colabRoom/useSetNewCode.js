import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const useSetNewCode = (
  setInputs,
  setOutput,
  setCode,
  setIsError,
  language,
  isError
) => {
  const compilerData = useSelector((store) => store.compilerdata);

  const getScreenCode = compilerData.codes.find(
    (obj) => obj.language === language
  );

  useEffect(() => {
    setInputs(getScreenCode?.inputs);
    setOutput(getScreenCode?.output);
    setCode(getScreenCode?.code);
    setIsError(getScreenCode?.isError);
  }, [compilerData.codes]);
};

export default useSetNewCode;
