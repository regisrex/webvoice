'use client'
import 'regenerator-runtime';

import { Button } from '@/common/ui/button';
import { MicrophoneIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Dictaphone = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();


  const [supportsSpeech, setSupportsSpeech] = useState(false)

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      setSupportsSpeech(false)
    } else {
      setSupportsSpeech(true)
    }
  }, [])

  if (!supportsSpeech) return <div>Doesn't support speech</div>
  return (
    <div className='flex flex-col items-center text-center gpa-10  py-10'>
      {/* <p className='text-lg'>Microphone: {listening ? 'on' : 'off'}</p> */}
      <div className={`flex items-center justify-center aspect-square p-10 rounded-full   ${listening ? "stroke-red-50" : "stroke-slate-50"}`}>
        <MicrophoneIcon className={`w-10 ${listening ? "stroke-red-400" : "stroke-slate-500"}`} />
      </div>
      <div className='flex items-center gap-10 mt-10'>

        <Button variant={'secondary'} onClick={() => SpeechRecognition.startListening({})}>Listen</Button>
        <Button variant={'secondary'} onClick={SpeechRecognition.stopListening}>Stop</Button>
        <Button variant={'secondary'} onClick={resetTranscript}>Reset</Button>
      </div>

      <div className='flex flex-col gap-2  w-[60vw]'>

        <p className='text-left'>Transcribed text</p>
        <p className='p-10 rounded-md  border border-slate-100 bg-slate-50'>{transcript}</p>
      </div>
    </div>
  );
};
export default Dictaphone;