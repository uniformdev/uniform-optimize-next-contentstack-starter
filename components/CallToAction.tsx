import { CallToActionFields, Entry } from '../lib/contentstack';
import WaveSplitter from './WaveSplitter';

const CallToActionComponent: React.FC<Entry<CallToActionFields>> = ({
  title,
  subheading,
  button_image,
  button_link,
  button_text,
}) => (
  <>
    <WaveSplitter />
    <section className="container mx-auto text-center py-6 mb-12">
      <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-white">{title}</h1>
      <div className="w-full mb-4">
        <div className="h-1 mx-auto bg-white w-1/6 opacity-25 my-0 py-0 rounded-t" />
      </div>
      <h2 className="my-4 text-3xl leading-tight">{subheading}</h2>
      <br />
      {button_link && button_image && (
        <button
          className="mx-auto mt-3 lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg"
          name="call to action"
          onClick={() => window.open(button_link)}
        >
          <img src={button_image.url} alt="button image" />
        </button>
      )}
      {button_link && !button_image && (
        <a
          href={button_link}
          target="_new"
          className="mx-auto mt-3 lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg"
        >
          {button_text}
        </a>
      )}
    </section>
  </>
);

export default CallToActionComponent;
