# Intro

Disrupt the void that is the eternal silence of the browser.  

For my Project B I created a Chrome extension called SwipeySynth. It sonifies browser activity.

# Concept

The initial idea for SwipeySynth came to me when I was looking through Chino's 100 days of browser extensions and I saw one called "trackpad poetry." Even though in his extension it didn't actually use trackpad inputs, it got me thinking about how versatile the trackpad can be for inputs. It is much more sensitive and intricate than any of the other ways to send information to your computer. This program was going to receive inputs and then output something, and I thought trackpad inputs would be very conducive to an engaging user experience.

# Features

The sound the extension makes is controlled primarily by three gestures.

Clicking the mouse plays a chord. There is an 8 chord chord progression that gets cycled through as the user clicks. It is the I-V-IV-VI chord progression, this is one of the most common chord progressions. I chose this one because I thought it would sound the nicest to the average listener but I also chose this one because this chord progression would work in every scale. (This Program also has a the ability to change the current scale to any traditional Western musical scale).

Scrolling up and down the page plays the 3rd of the fundamental of the last played chord (the second note in the chord). This guarantees that this note will always be in key and will be the kind of "counter melody" synth because it starts on the 3rd of the fundamental. I chose scrolling for this one because I wanted to find some way to emulate a mod wheel in this program. A mod wheel in music production can be mapped to anything, however it is often mapped to detune a synth to add little inflections. That's exactly what this synth does. You can bend the synth up or down by scrolling. It bends not only the scrolling synth but every synth to maintain the illusion that all of these synths are in a similar sonic space. I also thought it would be really distracting and jarring if one of the synths was detuned temporarily while the others weren't. This allows users to bend any of the chords that they play by clicking by scrolling up or down on the page right after playing the chord.

The third and arguably most important synth is the mouse synth. This synth tracks mouse movements and plays the "melody" of the browsing experience. This synth starts on the 5th of the fundamental of the last played chord (the third note in the chord). This makes it so that the melody follows the chord progression. Moving the mouse up raises the note and moving the mouse down lowers the note. I originally had it where left and right did things too, however that sent too many inputs to the synth as moving it up and down moves it slightly left or right too due to the nature of the trackpad. It just did not sound good.

So those are the synths and trackpad controls of the program. There are a few more controls in the popup that opens when the user clicks the extension icon. Here, the user can select their desired musical scale from a dropdown menu, change the volume, toggle a house drum loop, and switch between History and Live mode. History and Live mode are intended to allow the user to choose to either playback their inputs in real time or hear them played back later as a musical piece. Unfortunately, this element of the program has not yet been completed.

Here is a screenshot of the control panel.

![alt text](https://raw.githubusercontent.com/twaugh99/abc-student-repo/master/projects/project-B/ssforReadme.png)


# Technical Explanation

Essentially, the meat of this project takes place in the background script. The background script waits for inputs from the content script and waits for user settings from the popup script. The scripts send messages with a type and some form of secondary information related to the parameter it is controlling. Functions would sort through this information and send the information to smaller more specialized functions which would create the sounds.

This project creates sounds using the Tone.js library. This library allows for synths to be defined and manipulated with javascript.

The storage Chrome API was also used for this project to store user preferences after the controls popup window was closed.
