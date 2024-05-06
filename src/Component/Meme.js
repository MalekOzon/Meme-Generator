import React from "react";
import '../Css/Meme.css'

export default function Meme(){

    const [meme , setMeme] = React.useState({
        topText:"",
        bottomText:"",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    });

    const [allMeme , setAllMeme] = React.useState([]);

    React.useEffect(function(){
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMeme(data.data.memes))
    } , [])

    console.log("malek");
    console.log(allMeme);

    function getMemeImage (){
        const rand = Math.floor(Math.random() * allMeme.length );
        const url = allMeme[rand].url;
        setMeme(
            prev => ({
                ...prev ,
                randomImage : url
            })
        );
    }

    function handleChange(event){
        const {name, value} = event.target
        setMeme(prev => ({
            ...prev ,
            [name] : value
        }))
    }

    return(
    <main>
        <div className="form">
            <div>
                <input
                    type="text"
                    placeholder="Top Text"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Bottom Text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                    />
            </div>
            <button
                className="form--button"
                onClick={getMemeImage}
            >
                Get a new meme image 🖼
            </button>
        </div>
        <div className="meme">
                <img src={meme.randomImage} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
    </main>
)
}