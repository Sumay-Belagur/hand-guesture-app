Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 100
});

camera= document.getElementById("camera");

Webcam.attach('#camera');

function snap() {
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML= "<img id='result_img' src='"+data_uri+"'/>"
    })
}

console.log('ml5 version', ml5.version);

classifier= ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/1OH0oEtA9/model.json", modelLoaded);

function modelLoaded() {
    console.log("model loaded");
}

function speak() {
    var synth= window.speechSynthesis;
    speak_data_1= "The first prediction is" + prediction1;
    speak_data_2= "The second prediction is" + prediction2;
var utter_this= new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
synth.speak(utter_this);
}

function check() {
    img = document.getElementById("result_img");
    classifier.classify(img, gotResult)
}

function gotResult(error, result) {
if (error) {
    console.log(error);
}
else {
    console.log(result);
    prediction1= result[0].label;
    prediction2= result[1].label
    document.getElementById("guesture_id").innerHTML= prediction1;
    document.getElementById("guesture_id2").innerHTML= prediction2;
    speak();
    if (prediction1 == "pointing finger") {
        document.getElementById("emoji_id").innerHTML = "&#128073;";
    }

    if (prediction1 == "spider-man") {
        document.getElementById("emoji_id").innerHTML = "🤟";
    }

    if (prediction1 == "fist") {
        document.getElementById("emoji_id").innerHTML = "👊";
    }

    if (prediction2 == "pointing finger") {
        document.getElementById("emoji_id2").innerHTML = "&#128073;";
    }

    if (prediction2 == "spider-man") {
        document.getElementById("emoji_id2").innerHTML = "🤟";
    }

    if (prediction2 == "fist") {
        document.getElementById("emoji_id2").innerHTML = "👊";
    }
}
}