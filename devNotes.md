# BUILDING A SIMPLE MUSIC PLAYER

## 1. HTML Structure
### Algorithm

- Start with a basic HTML layout.

- Add an `<h1>` heading to show the title.

- Add buttons for Play, Pause, Next, Prev.

- Add an `<audio>` element for the player.

- Add a `<script>` tag to link your JavaScript file.

## 2. Style the elements
### Algorithm

- Define your visual structure using CSS.

- Center the main container.

- Use padding/margin for spacing.

- Add hover and transition effects for interactivity.

## 3. Make the buttons respond
### Algorithm

- Select your buttons in JS using querySelector.

- Add event listeners to detect clicks.

- Test with console.log() messages.

## 4. Add audio to the html and play it inside the button
### Algorithm

Select the` <audio>` element in JS.

On button click, call `.play()` on it.

Use `console.log("playing audio...")` to confirm.

### Implementation Notes
- inside the ```addEventListener(() => {
use the `id-of-the-audio.play()` to play the the audio and `console.log("playing audio....")` if it works
})```

## 5. Add pause functionality
### Algorithm

- Detect if the audio is currently paused or playing.

- If paused → play it.

- Else → pause it.

- Change button text/icon accordingly.

### Implementation Notes
- if(id-of-the-audio.paused) `.play()` to play music and update the button content else `.pause()` and update the button content to pause music

## 6. Add progress display
### Algorithm

- Create a `div` to show current time and duration.

- Listen to the `"timeupdate"` event on the audio.

- Get `audio.currentTime `and `audio.duration`.

- Convert seconds → minutes:seconds format.

- Update the display in real-time.

### Implementation Notes
- In the html add a parent div and child div. Style the parent div and initialize the child div with 0:00/0:00.
- Update progress as music plays
- the browser listens for a `'timeupdate'` event while the audio plays. `addEventListener(('timeUpdate') => {})`
- inside the callback 
``addEventListener(('timeUpdate') => {
    `element.currentTime` ``captures how many seconds have played``
    `element.duration` ``captures full length of audio in seconds``
    `div-element.textContent` ``to dynamically update the display using template literals currentTime/duration``
})``
- write a function to convert and return seconds to `minutes:seconds` and the seconds be in 2 digits(use `if/else` statement)
- in the function 
```
nameofFunction(seconds) {
if(!Number.isFinite(seconds)|| seconds < 0) return "0:00"}
```
this is a guard clause, it means if the seconds is not a valid finite number(NAN, infinty, undefined,string negative, etc) then stop and return "0:00" immediately

create two variables, `mins` and `secs`
to give minutes and cuttoff decimals, ```const mins = math.floor(seconds/60)```
to give the remainder which is the seconds, ```const secs = math.floor(seconds % 60)```

write an `if/else` statement 
```
if(sec < 10>) return mins: 0sec
else return mins:sec
```

put mins and secs in template literals

- inside the `timeUpdate` event callback use the helper function to get the formatted time of the `currentTime` and `duration`

## 7. Adding a progress bar
### Algorithm

- Create parent and child divs (progressContainer & progressBar).

- Listen to `"timeupdate"`.

- Calculate progress = (currentTime / duration) * 100.

- Update child div width using that value.

### Implementation Notes

- The song must be loaded/ready
- inside the ``timeupdate`` callback write an `if/else` statement to calculate percentage of the song played
- save the progress to a variable = `(element.currentTime / element.duration) x 100`
- e.g if currentTime = 50 and duration = 200
```
percent 0r variable = (50/200) X 100 = 0.25 X 100 = 25%
```
- updating the visual bar
```
element.style.width = percent or variable%(wrap in template literals)
```

## 8. Click to seek functionality(Making the song jump to where you click on the progress bar)
### Notes
- `e.currentTarget.getBoundingClientRect()` is used within an event handeler to obtain the size and position of the element to which the event listener was attached, relative tot the viewport.
- `e.currentTarget`: This property of the `event` object refers to the element on which the event listwener was attached and triggered. This is distinct from `e.target`, which refers tot the specific element that initiated the event (e.g, if you click a child element within a parent with a listener, `e.target` would be the child, while `e.currentTarget` would be the parent).
- `.getBoundingClientRect()`: is an element method that returns a `DOMRECT` object. The objectcontains properties describing the size and position of the element relative to the viewport(the visible area of the browser window).
#### properties of the DOMRECT
- `left`: x-coordinate of the element left edge relative to the viewport.
- `right`: x-coordinate of the element right edge relative to the viewport.
- `top`: y-coordinate of the element top edge relative to the viewport.
- `bottom`: y-coordinate of the element bottom edge relative to the viewport.
- `x`: same as left.
- `y`: same as right.
- `width`: The width of the element including padding and border-width.
- `height`: The height of the element including padding and border-width.
### Also Note
- `e.clientX`: Shows the horizontal position oof the mouse pointer withing the visible browser window.
- subtracting the element's left position from the mouse's clientX effectively 'removes' the viewport offset, resulting in the mouse's horizontal position relative to the element's own left edge.
```
e.clientX - e.currentTarget.getBoundingClientRect().left
```
### Algorithm

-Listen for clicks on the progress container.

- Get click position with e.clientX.
- 
- Get container position using getBoundingClientRect().
- 
- Calculate the ratio of click position to container width.
- 
- Multiply that ratio by audio duration to get new time.
- 
- Set audio.currentTime to that time.
### Implementation Notes

- select the div-container and set an event on it.
- in the callback, get the DOMRECT object
- calculate the percent
```
(mouse left - element left) / element width
```
- set the audioPlayer.currentTime to percent X audioplayer.duration

## 9. To catch eeror when the app/audio crashes and display the error to the user
### Algorithm

- When .play() is called, wrap it in .then() and .catch().
- 
- If playback fails (e.g., offline), show an error div.
- 
- Use a helper function showError(message) that:
- 
- Displays the error div
- 
- Removes it after a few seconds using setTimeout().

### Implementation Notes

- inside the element(button) event listener that plays the music, write an `if/else` statement that to check if the audio is playing
- if it is, if it's not(`.paused`) `.play()` and chain it with `.play().then(()=>{}).catch(()=>{})` to the audio.
- in the `.then(()=>{})` update the play button to pause
- in the `.catch(()=>{})` catch the error and display the error to the user with an helper function
-create a helper function, in the function create a small div that appears at the bottom or anywhere of the app with a message like "couldn't play audio, check your connection" and disappears after some seconds `setTimeout(()=>{}, milliseconds)`.

## 10. Adding previous and next functionality
### Algorithm

- Store all songs in an array of objects.
- 
- Track current index with currentSongIndex.
- 
- For Next: (index + 1) % songs.length.
- 
- For Previous: (index === 0) ? songs.length - 1 : index - 1.
- 
- Load and play the new song.
- 
- On "ended", call next automatically.

### Implementation Notes
- Create and store song urls in an array. E.g
```
const songs = [
    {
        title: xxxx,
        artist: yyy,
        url: www,
        image: zzz,
},
{
        title: xxxx,
        artist: yyy,
        url: www,
        image: zzz,
}]
```
- set a current song tracker that tracks which song we're currently playing, starts at 0(first song in the array)
```
let currentSongIndex = 0
```
- write a helper function that loads the song and play it `.load()` and `.play()`
```
function name(index) {
    currentSonfIndex = 0
    audio.src = songs[index].url
    audio.play()
    audio.play()
}
```
- no need to add the `src` attribute in the audio html tag

### Next logic
- To get the index of the next song, we use modulo.
- we add the `currentSongIndex` to 1 then divide using modulo by the length of the song(this create a loop when we reach the end of the song, it goes back to the first song)
- then we load the `currentSongIndex`.
- E.g
```
function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  play the audio
  also update the button content
}
```

### Previous logic
- write a statement that if `currentSongIndex` is equal to 0 return the last song(which song.length - 1) else return currentSongIndex - 1
- load the currentSongIndex
- E.g 
```
function prevSong() {
  currentSongIndex = currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;
  loadSong(currentSongIndex);
  play the audio
  also update the button content
}
```

### Auto-advance logic
use the event type "ended" to listen to when the song finishes and automatically play the next song.

## 11. Adding volume
### Algorithm

- Add a slider input (type="range") in HTML.

- Set min=0, max=1, step=0.01.
- 
- Listen for "input" event.
- 
- Update audio.volume with slider value.

### Implementation Notes
Every `<audio>` element in `HTML` las a `volume` property(ranges from 0.0-1.0) E.g element.volume = 0.5 sets the audio to 50% volume. By connecting this property too an inout slider, audio volume in real time can be adjusted.
- Add a slider in `HTML`, input type should be `range`, min=0, max=1, step=0.01, value=1(full volume).
- Select the slider in js.
- Listen for the `input` event on the slider, input fires as the user drags the slider(better than change, which only fires after release).
- Update the audio.player volume each time the slider moves
```
element.volume = slider.value
```
- Show volume icon beside the slider(volume range).

## 12. Adding Song Title and Artist Name
### Algorithm

- Add title and artist fields to your songs array.
- 
- In loadSong(), update HTML text with these values.
- 
- On page load, show the first song info.

### Implementation Notes
- Update the song array, should be an array of objects with properties that can be accessed with `songs.title`, `.artist`
- Update `loadsong()` to update the UI with  the song title and artist
- Add UI elements in the `HTML`
- Initialize on page load, this shows first song title and artist even before the user presses play

## 13. Playlist visualisation
- Add a Playlist Container in HTML
- Create a div or ul in your HTML to hold the list of songs. Example:
```
 <ul id="playlist"></ul>
```
- Generate Playlist Dynamically from the Songs Array, Loop through the songs array and create a `<li>` for each song. Display both title and artist in the list item.
- Highlight the Currently Playing Song, Add a CSS class (e.g., .active) to the `<li>` or `HTML` tag that corresponds to the current song index. Remove the .active class from the previous song when switching.
- Initialize Storage: `const playListItems = []` creates an array to store references to all generated playlist DOM elements for later access (e.g., highlighting the active song).
- Iterate Through Songs: `songs.forEach((song, idx) => { ... })` loops through each song object in the songs array, giving both the song data (song) and its index (idx).
- Create Playlist Item: For each song, a new `<div>` (playListDiv) is created dynamically. The .innerHTML property injects structured markup containing: The song cover (<img> tag),The song title and artist (<p> tags).
- Styling & Structure: Each playlist item gets the playListSong class for consistent styling. The item is appended to the main playlist container (#playList) in the DOM.
- The newly created playListDiv is pushed into playListItems[] so the app can later manipulate these elements.
- An event listener is attached to each playlist item. On click, it: Calls highlightCurrentSong(idx) to visually mark the selected song, Calls loadSong(idx) to load the corresponding audio source, Calls playSong() to begin playback immediately.
- write a helper function `highlightCurrentSong(idx)` that removes class from one and set to another( with an arg)
- Click to Play a Song from the Playlist. Add a click event listener to each `<li>`. When clicked, it should call loadSong(index) with that specific index and start playing it. Styling the Playlist, Use simple CSS to make the list clean (hover effects, active highlight color).

## 14. Adding Keyboard Shortcuts(Space for play/pause, arrow right = next, arrow left = previous)
- Set the keydown event to the document so it works globally.
- key detection: insided the event handler, check `event.code`(prefered over event.key because it's consistent across layouts).
- Prevent default behaviour: space normally scrolls the page down, to stop that call `event.preventDefault()` when space is pressed.
- Call all existing helper functions to the related keys and for play/pause.
- Map keys into actions using `if/else`.

## 15. Album art display
- Decide Where to Show It or add an img element or create one to dynamically show the artwork
- Update Songs Data. Each song in your songs array needs an extra property → cover (URL/path to the image).
- In your loadSong(index) function (where you already update title & artist), also update the src of the <img> to the current song’s cover.
- Fallback Image: In case a song doesn’t have artwork, show a default placeholder image (like a vinyl record or a music note).
- Styling: Fix width & height (e.g., 200px × 200px). Use object-fit: cover in CSS → makes sure the image fills the box nicely without distortion. Add border-radius (circle or rounded square) to make it aesthetic.
- Extra Enhancement (optional):  Highlight the album art with a glowing border when playing or Dim it (lower opacity or grayscale) when paused. 
- Decide your fallback style: Will it be a default picture (like a CD icon)? Or just a text fallback with the first letter?
- Target the images in your playlist with document.querySelectorAll().
- Attach an error listener to each image so it reacts when it fails to load.
-Inside the error handler: If you want a default picture → replace the src with your placeholder. If you want a text fallback → create a <div>, give it styles, and replace the image with it. `element.parentnode.replaceChild(newchild, oldchild)`.
- Add the error listener to where you want to update/handle the image error.

## 16. Adding theme toggle(Dark and light mode).
### Notes(understaning localStorage to help fully control the theme logic)
#### What is localStorage?
- localStorage is a built-in browser feature that lets you store small pieces of data on a user’s device, right inside their browser. It’s like a tiny database that lives inside Chrome, Firefox, Edge, etc.
- And even if the user closes the tab or shuts down the PC, that note stays saved until the user or your site deletes it.
#### key characteristics

| Feature         | Description                                                      |
| --------------- | ---------------------------------------------------------------- |
| **Type**        | Simple key-value storage (like a dictionary)                     |
| **Persistence** | Data stays after closing the browser or restarting your computer |
| **Limit**       | Around 5–10MB per domain                                         |
| **Scope**       | Works only for the site that set it (same origin rule)           |
| **Access**      | Only through JavaScript — not visible to other websites          |

#### Example
- Let’s say you want to store a theme preference:
```
localStorage.setItem("theme", "dark");
```
That means we’ve created a key ("theme") and given it a value ("dark").

- To read it back later:
```
const userTheme = localStorage.getItem("theme");
console.log(userTheme); // → "dark"
```
- to delete it:
```
localStorage.removeItem("theme");
```
- To clear everything your site has stored:
```
localStorage.clear();
```
### Steps
- Add a button to the HTML for the toggling
- Add a class to the body to load the default color(light mode) - will be styled with default colors
E.g 
```
.light {
  --bg: red;
}

.dark {
  --bg: blue
}

#container {
  background-color: var(--bg);
}
```
#### Using localStorage to remember the theme after reload
- On page load check if there’s a saved "theme" key on the body.

- If yes, get it and apply it. update the button content according to the mode.

- If not use the default (light)- add the `.light` class

- When user clicks toggle → switch theme + update LocalStorage.

#### When the button is clicked, JS will:
- check if the body has the light class
```
element.classList.contains()
```
- if yes, remove the `light` class and add `dark`
```
element.classList.replace("current", "new")
```
- if no, remove `dark` and add `light`.
- Also make the button change emoji when toggled.

## 17. Adding Shuffle and Repeat feature

### Algorithm

#### Shuffle Mode

- When the shuffle button is clicked, toggle shuffle mode ON or OFF.
- If shuffle is ON, the next song should be randomly chosen, not the next one in order.

- Make sure the new song is not the same as the current one (avoid immediate repeats).

- When shuffle is OFF, songs play normally in sequence.

#### Repeat Mode

- When the repeat button is clicked, toggle repeat mode ON or OFF.

- If repeat is ON and a song ends, play the same song again.

- If repeat is OFF, move to the next song (or random if shuffle is active).

- Only one mode can be active at a time (optional design decision).

### Implementation Notes
1. Setup HTML Elements

Add two buttons in your HTML:
```
<button id="shuffleBtn">🔀</button>
<button id="repeatBtn">🔁</button>
```

2. Define State Variables

- In your JS:
```
let isShuffling = false;

let isRepeating = false;
```

- You should already have:
```
let currentSongIndex = 0;
songs (array of songs)
audio (audio element)
```

3. Handle Shuffle Button

- Add an event listener for shuffleBtn.

- When clicked, Toggle the value of isShuffling.

- If isShuffling becomes true, set isRepeating to false.

- Update button visuals (like color or icon).

4. Handle Repeat Button

- Add an event listener for repeatBtn.

- When clicked: Toggle isRepeating.

- If isRepeating becomes true, set isShuffling to false.

- Update button visuals.

5. Handle Song End Logic

- When the current song ends `(audio.addEventListener('ended', ...))`:

- If isRepeating → reload and play the same song.

- Else if isShuffling → pick a random new index different from current.

- Else → move to next song (normal order). use the if/else in the next and prev button so that if repeat is active, the song keeps repeating unless removed, and the song keeps shuffling when you click next/prev and when the song ends until when the class is removed by the user(through clicking the button ir icon).

- Make sure to handle when you reach the end of the playlist.

6. (Optional UX Upgrade)

- Highlight the active mode button using .active CSS class.

Example:

```
.active { color: limegreen; }
```

### Let’s now add the “no immediate repeat during shuffle” logic directly into your code in a way that’s clean, readable, and consistent with your if/else if style.


#### Algorithm

- When the shuffle mode is ON and the current song ends or “next” is pressed:

- Pick a random song index.

- If the random index is the same as the current one, pick again until it’s different.

- Then load and play that new song.

- If there’s only one song, just replay it (because there’s nothing else to pick).

#### Implementation Notes

- Inside your shuffle logic, you’ll use a while loop to prevent the same song from repeating.

- You’ll store and update currentSongIndex after picking a new one.

- You’ll call loadSong() and playSong() once a different song is selected.

- This function will be called from your "ended" event listener or next/prev logic whenever shuffle is active.

### saving the states to localStorage(to remember the shuffle& repeat button)
- In respective buttons event listener set the boolean of the state in localStage
```
localStorage.setItem("isRepeating", isRepeating)
localStorage.setItem("isShuffling", isShuffling)
```
put both in the two button listener or just put both in a helper function

- in the `initialize()` helper function used in the window onloand event, get the booleans with
```
=== "true"
```
and convert them to booleans(they're stored in strings)....so write a single if each for the isShuffling & isRepeaating to add the `classList`

## 17. Adding a favorite/ like functionality
- Add a button, select in html an use the toggle class helper function to update the color when clicked.
- Set the class to localStorage to remember the class.
- Get and convert the boolean and set the class on load.