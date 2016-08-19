// Js for app demo



// Manage frame
function demo () {
    // Document elements
    var windows = [].slice.call(
        document.querySelectorAll('[data-role="window"]')
    );
    var desktop = document.getElementById("Desktop-Landscape");
    var label = document.getElementById('demo-label')


    // String of commands to show in demo
    var commandArray = new Array(10).fill("⌘ + ")
        .map(function(elm, index) {
            return {
                window: windows.filter(function(elm){
                    return elm.getAttribute("data-index") == index;
                })[0],
                text: elm + index
            }
        });

    // Keep track of who's on top
    var showing = new Set();

    return function () {
        // Reset windows if all are showing
        if (showing.size > 9) {
            commandArray.forEach(function(elm){
                elm.window.classList.remove("open");
            });
            showing.clear()
        }

        // Get random elment from command array
        var current = commandArray[Math.floor(Math.random()*commandArray.length)];
        while(showing.has(current)) {
            current = commandArray[Math.floor(Math.random()*commandArray.length)];
        }

        // Bring window to front
        desktop.removeChild(current.window);
        desktop.appendChild(current.window);

        // Open window
        current.window.classList.add("open");

        // Update text
        label.textContent = current.text;
        label.classList.remove("show");
        label.classList.add("show");

        // Increase showing count
        showing.add(current.window);
    }
}

// Loop
function seconds(seconds) { return seconds * 1000 };
var length = seconds(1.5); // 1.5s

setInterval (demo(), length);
