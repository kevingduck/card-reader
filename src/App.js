import React from 'react';
import Tesseract from 'tesseract.js';
import ImageUploader from 'react-images-upload';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { pictures: [] };
        this.onChange = this.onChange.bind(this);
    }

    onChange(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
        console.log("Added picture to state. Recognizing text ...")
        Tesseract.recognize(
            'https://tesseract.projectnaptha.com/img/eng_bw.png',            
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
                    buttonText='Choose images'
                    onChange={this.onChange}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                />
            </div>
        );
    }
}

export default App