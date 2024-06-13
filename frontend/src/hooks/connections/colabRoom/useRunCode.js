import { LANGUAGE_VERSIONS } from '../../../components/colab/compiler/constants';

const useRunCode = () => {
  const runcode = async (language, sourceCode, inputs) => {
    try {
      //

      const response = await fetch(`https://emkc.org/api/v2/piston/execute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language,
          version: LANGUAGE_VERSIONS[language],
          files: [
            {
              content: sourceCode,
            },
          ],
          stdin: inputs,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to execute code');
      }

      const data = await response.json();

      //
      return data;
    } catch (error) {
      toast.error(error);
      throw error;
    }
  };
  return runcode;
};

export default useRunCode;
