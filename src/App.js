import React from 'react';
import Tesseract from 'tesseract.js';
import ImageUploader from 'react-images-upload';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { pictures: [] };
        this.onChange = this.onChange.bind(this);
        this.runOCR = this.runOCR   .bind(this);

    }

    onChange(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
        console.log("Added picture to state. Recognizing text ...")
    }

    runOCR() {
        Tesseract.recognize(
            this.state.pictures[0],
            'eng',
            { logger: m => console.log(m) }
          ).then(({ data: { text } }) => {
            console.log(text);
          })
    }

    render() {
        return (
            <div>
                <ImageUploader
                    withIcon={true}
                    withPreview={true}
                    buttonText='Choose image'
                    onChange={this.onChange}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={52428800}
                />
                <button onClick={this.runOCR}>Run OCR</button>
            </div>
        );
    }
}

export default App