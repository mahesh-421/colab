import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { addCode } from '../../../utils/redux/compilerSlice';
import toast from 'react-hot-toast';

export const LANGUAGE_VERSIONS = {
  javascript: '18.15.0',
  python: '3.10.0',
  java: '15.0.2',
  cpp: '10.2.0',
};

export const CODE_SNIPPETS = {
  javascript: `\n\tconsole.log("Hello, World");\n`,
  python: `\nprint("Hello, World")\n`,
  java: `\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
  cpp: `\n#include <iostream>\nint main() {\n\tstd::cout << "Hello, World";\n\n\treturn 0;\n}\n`,
};

export const setup = () => {
  const dispatch = useDispatch();
  const set = () => {
    // toast.error('HI');
    const languages = Object.entries(LANGUAGE_VERSIONS);
    languages.forEach(([language, version]) => {
      const obj = {
        language: `${language}`,
        version: `${version}`,
        code: `${CODE_SNIPPETS[language]}`,
        inputs: '',
        output: '',
        isError: false,
      };
      dispatch(addCode(obj));
    });
  };
  useEffect(() => {
    set();
  }, []);
};
