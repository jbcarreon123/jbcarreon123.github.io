/*
    (PLEASE DO NOT DELETE THIS HEADER OR CREDIT!)

    User customizable settings below!
    Please refer to my guide over on https://virtualobserver.moe/ayano/comment-widget if you're confused on how to use this.
    The IDs at the top are a requirement but everything else is optional!
    Do not delete any settings even if you aren't using them! It could break the program.

    After filling out your options, just paste this anywhere you want a comment section
    (But change the script src URL to wherever you have this widget stored on your site!)

        <div id="c_widget"></div>
        <script src="comment-widget.js"></script>

    Have fun! Bug reports are encouraged if you happen to run into any issues.
    - Ayano (https://virtualobserver.moe/)
*/

// The values in this section are REQUIRED for the widget to work! Keep them in quotes!
var s_stylePath = '/lib/comment-widget-dark.css';
var s_formId = '1FAIpQLSfDoGhnkYuiIsJ70RRFKUYVPskh_IvDJ3Ui0zPTIWQiofO2Cw';
var s_nameId = '1438018472';
var s_websiteId = '1977262085';
var s_textId = '1023604070';
var s_pageId = '1264996779';
var s_replyId = '1483089937';
var s_adminId = '87020257';
var s_sheetId = '1G0WA49Y7kBWbltxIxz9VGECiH58fvBbI4hje0rGvdc8';

// The values below are necessary for accurate timestamps, I've filled it in with EST as an example
var s_timezone = +8; // Your personal timezone (Example: UTC-5:00 is -5 here, UTC+10:30 would be 10.5)
var s_daylightSavings = false; // If your personal timezone uses DST, set this to true
// For the dates DST start and end where you live: [Month, Weekday, which number of that weekday, hour (24 hour time)]
var s_dstStart = ['March', 'Sunday', 2, 2]; // Example shown is the second Sunday of March at 2:00 am
var s_dstEnd = ['November', 'Sunday', 1, 2]; // Example shown is the first Sunday of November at 2:00 am

// Misc - Other random settings
var s_commentsPerPage = 10; // The max amount of comments that can be displayed on one page, any number >= 1 (Replies not counted)
var s_maxLength = 1024; // The max character length of a comment
var s_maxLengthName = 24; // The max character length of a name
var s_commentsOpen = true; // Change to false if you'd like to close your comment section site-wide (Turn it off on Google Forms too!)
var s_collapsedReplies = true; // True for collapsed replies with a button, false for replies to display automatically
var s_longTimestamp = false; // True for a date + time, false for just the date
var s_includeUrlParameters = false; // Makes new comment sections on pages with URL parameters when set to true (If you don't know what this does, leave it disabled)
var s_fixRarebitIndexPage = false; // If using Rarebit, change to true to make the index page and page 1 of your webcomic have the same comment section

// Word filter - Censor profanity, etc
var s_wordFilterOn = false; // True for on, false for off
var s_filterReplacement = '****'; // Change what filtered words are censored with (**** is the default)
var s_filteredWords = [ // Add words to filter by putting them in quotes and separating with commas (ie. 'heck', 'dang')
    'heck', 'dang'
]

// Text - Change what messages/text appear on the form and in the comments section (Mostly self explanatory)
var s_widgetTitle = 'Leave a comment!';
var s_nameFieldLabel = 'Name';
var s_websiteFieldLabel = 'Website (Optional)';
var s_textFieldLabel = '';
var s_submitButtonLabel = 'Submit';
var s_loadingText = 'Loading comments...';
var s_noCommentsText = 'No comments yet!';
var s_closedCommentsText = 'Comments are closed temporarily!';
var s_websiteText = 'Website'; // The links to websites left by users on their comments
var s_replyButtonText = 'Reply'; // The button for replying to someone
var s_replyingText = 'Replying to'; // The text that displays while the user is typing a reply
var s_expandRepliesText = 'Show Replies';
var s_leftButtonText = '<<';
var s_rightButtonText = '>>';

/*
    DO NOT edit below this point unless you are confident you know what you're doing!
    Everything else is automatic, you don't have to change anything else. ^^
    However, feel free to edit this code as much as you like! Just please don't remove my credit if possible <3
*/

// Fix the URL parameters setting for Rarebit just in case
if (s_fixRarebitIndexPage) { s_includeUrlParameters = true }

var a_commentDivs = []; // For use in other functions

// Apply CSS
var c_cssLink = document.createElement('link');
c_cssLink.type = 'text/css';
c_cssLink.rel = 'stylesheet';
c_cssLink.href = s_stylePath;
document.getElementsByTagName('head')[0].appendChild(c_cssLink);

// HTML Form
var v_mainHtml = `
    <div id="c_inputDiv">
        <form id="c_form" onsubmit="c_submitButton.disabled = true; v_submitted = true; refreshForm();" method="post" target="c_hiddenIframe" action="https://docs.google.com/forms/d/e/${s_formId}/formResponse"></form>
    </div>
    <div id="c_container">${s_loadingText}</div>
`;
var v_formHtml = `
    <h1 id="c_widgetTitle">${s_widgetTitle}</h1>

    <div id="c_nameWrapper" class="c-inputWrapper">
        <input class="c-input c-nameInput bhv max-w-full" placeholder="name *" name="entry.${s_nameId}" id="entry.${s_nameId}" type="text" maxlength="${s_maxLengthName}" required>
    </div>

    <div id="c_websiteWrapper" class="c-inputWrapper">
        <input class="c-input c-websiteInput bhv max-w-full"  placeholder="website" name="entry.${s_websiteId}" id="entry.${s_websiteId}" type="url" pattern="https://.*">
    </div>

    <div id="c_textWrapper" class="c-inputWrapper">
        <textarea class="c-input c-textInput bhv max-w-full"  placeholder="your comment (pls be nice, markdown is supported!) *" name="entry.${s_textId}" id="entry.${s_textId}" rows="4" cols="50"  maxlength="${s_maxLength}" required></textarea>
    </div>
    
    <input name="entry.${s_adminId}" class="entry-admin" id="entry.${s_adminId}" type="text" style="display:none;pointer-events: none;" value="false">

    <input id="c_submitButton" name="c_submitButton" type="submit" value="${s_submitButtonLabel}" disabled>
`;

// Insert main HTML to page
document.getElementById('c_widget').innerHTML = v_mainHtml;
var c_form = document.getElementById('c_form');
if (s_commentsOpen) { c_form.innerHTML = v_formHtml }
else { c_form.innerHTML = s_closedCommentsText }

function init() {
    document.getElementById('c_widget').innerHTML = v_mainHtml;
    c_form = document.getElementById('c_form');
    if (s_commentsOpen) { c_form.innerHTML = v_formHtml }
    else { c_form.innerHTML = s_closedCommentsText }
}

// Initialize misc things
var c_container = document.getElementById('c_container');
var v_pageNum = 1;
var v_amountOfPages = 1;
var v_commentMax = 1;
var v_commentMin = 1;

// Set up the word filter if applicable
var v_filteredWords;
if (s_wordFilterOn) {
    v_filteredWords = s_filteredWords.join('|');
    v_filteredWords = new RegExp(String.raw`\b(${v_filteredWords})\b`, 'ig');
}

// The fake button is just a dummy placeholder for when comments are closed
var c_submitButton;
if (s_commentsOpen) { c_submitButton = document.getElementById('c_submitButton') }
else { c_submitButton = document.createElement('button') }

// Add invisible page input to document
var v_pagePath = window.location.pathname;
if (s_includeUrlParameters) { v_pagePath += window.location.search }
if (s_fixRarebitIndexPage && v_pagePath == '/') { v_pagePath = '/?pg=1' }
var c_pageInput = document.createElement('input');
c_pageInput.value = v_pagePath; c_pageInput.type = 'text'; c_pageInput.style.display = 'none';
c_pageInput.id = 'entry.' + s_pageId; c_pageInput.name = c_pageInput.id;
c_form.appendChild(c_pageInput);

// Add the "Replying to..." text to document
var c_replyingText = document.createElement('span');
c_replyingText.style.display = 'none'; c_replyingText.id = 'c_replyingText';
c_form.appendChild(c_replyingText);
c_replyingText = document.getElementById('c_replyingText');

// Add the invisible reply input to document
var c_replyInput = document.createElement('input');
c_replyInput.type = 'text'; c_replyInput.style.display = 'none';
c_replyInput.id = 'entry.' + s_replyId; c_replyInput.name = c_replyInput.id;
c_form.appendChild(c_replyInput);
c_replyInput = document.getElementById('entry.' + s_replyId);

// Add the invisible iFrame to the document for catching the default Google Forms submisson page
var v_submitted = false;
var c_hiddenIframe = document.createElement('iframe');
c_hiddenIframe.id = 'c_hiddenIframe'; c_hiddenIframe.name = 'c_hiddenIframe'; c_hiddenIframe.style.display = 'none'; c_hiddenIframe.setAttribute('onload', 'if(v_submitted){fixFrame()}');
c_form.appendChild(c_hiddenIframe);
c_hiddenIframe = document.getElementById('c_hiddenIframe');

document.addEventListener("astro:page-load", () => {
    setTimeout(() => {
        init();

        // Initialize misc things
        c_container = document.getElementById('c_container');
        v_pageNum = 1;
        v_amountOfPages = 1;
        v_commentMax = 1;
        v_commentMin = 1;

        // Set up the word filter if applicable
        v_filteredWords;
        if (s_wordFilterOn) {
            v_filteredWords = s_filteredWords.join('|');
            v_filteredWords = new RegExp(String.raw`\b(${v_filteredWords})\b`, 'ig');
        }

        // The fake button is just a dummy placeholder for when comments are closed
        c_submitButton;
        if (s_commentsOpen) { c_submitButton = document.getElementById('c_submitButton') }
        else { c_submitButton = document.createElement('button') }

        // Add invisible page input to document
        v_pagePath = window.location.pathname;
        if (s_includeUrlParameters) { v_pagePath += window.location.search }
        if (s_fixRarebitIndexPage && v_pagePath == '/') { v_pagePath = '/?pg=1' }
        c_pageInput = document.createElement('input');
        c_pageInput.value = v_pagePath; c_pageInput.type = 'text'; c_pageInput.style.display = 'none';
        c_pageInput.id = 'entry.' + s_pageId; c_pageInput.name = c_pageInput.id;
        c_form.appendChild(c_pageInput);

        // Add the "Replying to..." text to document
        c_replyingText = document.createElement('span');
        c_replyingText.style.display = 'none'; c_replyingText.id = 'c_replyingText';
        c_form.appendChild(c_replyingText);
        c_replyingText = document.getElementById('c_replyingText');

        // Add the invisible reply input to document
        c_replyInput = document.createElement('input');
        c_replyInput.type = 'text'; c_replyInput.style.display = 'none';
        c_replyInput.id = 'entry.' + s_replyId; c_replyInput.name = c_replyInput.id;
        c_form.appendChild(c_replyInput);
        c_replyInput = document.getElementById('entry.' + s_replyId);

        // Add the invisible iFrame to the document for catching the default Google Forms submisson page
        v_submitted = false;
        c_hiddenIframe = document.createElement('iframe');
        c_hiddenIframe.id = 'c_hiddenIframe'; c_hiddenIframe.name = 'c_hiddenIframe'; c_hiddenIframe.style.display = 'none'; c_hiddenIframe.setAttribute('onload', 'if(v_submitted){fixFrame()}');
        c_form.appendChild(c_hiddenIframe);
        c_hiddenIframe = document.getElementById('c_hiddenIframe');
    }, 1000)
})

// Fix the invisible iFrame so it doesn't keep trying to load stuff
function fixFrame() {
    v_submitted = false;
    c_hiddenIframe.srcdoc = '';
    getComments(); // Reload comments after submission
}

function refreshForm() {
    setTimeout(getComments, 1500);
}

// Processes comment data with the Google Sheet ID
function getComments() {
    // Disable the submit button while comments are reloaded
    c_submitButton.disabled;

    // Reset reply stuff to default
    c_replyingText.style.display = 'none';
    c_replyInput.value = '';

    // Clear input fields too
    if (s_commentsOpen) {
        document.getElementById(`entry.${s_nameId}`).value = '';
        document.getElementById(`entry.${s_websiteId}`).value = '';
        document.getElementById(`entry.${s_textId}`).value = '';
    }

    // Get the data
    var url = `https://docs.google.com/spreadsheets/d/${s_sheetId}/gviz/tq?`;
    var retrievedSheet = getSheet(url);

    // Do stuff with the data here
    retrievedSheet.then(result => {
        // The data comes with extra stuff at the beginning, get rid of it
        var json = JSON.parse(result.split('\n')[1].replace(/google.visualization.Query.setResponse\(|\);/g, ''));

        // Need index of page column for checking if comments are for the right page
        var isPage = (col) => col.label == 'Page';
        var pageIdx = json.table.cols.findIndex(isPage);

        // Turn that data into usable comment data
        // All of the messy val checks are because Google Sheets can be weird sometimes with comment deletion
        var comments = [];
        if (json.table.parsedNumHeaders > 0) { // Check if any comments exist in the sheet at all before continuing
            var converter = new showdown.Converter()

            for (r = 0; r < json.table.rows.length; r++) {
                // Check for null rows
                var val1;
                if (!json.table.rows[r].c[pageIdx]) { val1 = '' }
                else { val1 = json.table.rows[r].c[pageIdx].v }

                // Check if the page name matches before adding to comment array
                if (val1 == v_pagePath) {
                    var comment = {}
                    for (c = 0; c < json.table.cols.length; c++) {
                        // Check for null values
                        var val2;
                        if (!json.table.rows[r].c[c]) { val2 = '' }
                        else { val2 = json.table.rows[r].c[c].v }

                        if (json.table.cols[c].label == "Text") {
                            comment[json.table.cols[c].label] = converter.makeHtml(DOMPurify.sanitize(val2), { FORBID_TAGS: ['style'] });
                        } else {
                            comment[json.table.cols[c].label] = val2;
                        }
                        // Finally set the value properly

                    }
                    comment.Timestamp2 = json.table.rows[r].c[0].f;
                    comments.push(comment);
                }
            }
        }

        // Check for empty comments before displaying to page
        if (comments.length == 0 || Object.keys(comments[0]).length < 2) { // Once again, Google Sheets can be weird
            c_container.innerHTML = s_noCommentsText;
        } else { displayComments(comments) }

        c_submitButton.disabled = false // Now that everything is done, re-enable the submit button
    })
}

// Fetches the Google Sheet resource from the provided URL
function getSheet(url) {
    return new Promise(function (resolve, reject) {
        fetch(url).then(response => {
            if (!response.ok) { reject('Could not find Google Sheet with that URL') } // Checking for a 404
            else {
                response.text().then(data => {
                    if (!data) { reject('Invalid data pulled from sheet') }
                    resolve(data);
                })
            }
        })
    })
}
function displayComments(comments) {
    // Clear for re-display
    a_commentDivs = [];
    c_container.innerHTML = '';

    // Get all reply comments by taking them out of the comment array
    var replies = [];
    for (i = 0; i < comments.length; i++) {
        if (comments[i].Reply) {
            replies.push(comments[i]);
            comments.splice(i, 1);
            i--;
        }
    }

    // Values for pagination
    v_amountOfPages = Math.ceil(comments.length / s_commentsPerPage);
    v_commentMax = s_commentsPerPage * v_pageNum;
    v_commentMin = v_commentMax - s_commentsPerPage;

    // Main comments (not replies)
    comments.reverse(); // Newest comments go to top
    for (i = 0; i < comments.length; i++) {
        var comment = createComment(comments[i]);

        // Reply button
        var button = document.createElement('button');
        button.innerHTML = s_replyButtonText;
        button.value = comment.id;
        button.setAttribute('onclick', `openReply(this.value)`);
        button.className = 'c-replyButton';
        comment.appendChild(button);

        // Choose whether to display or not based on page number
        comment.style.display = 'none';
        if (i >= v_commentMin && i < v_commentMax) { comment.style.display = 'block' }

        comment.className = 'c-comment';
        c_container.appendChild(comment);
        a_commentDivs.push(document.getElementById(comment.id)); // Add to array for use later
    }

    // Replies
    for (i = 0; i < replies.length; i++) {
        var reply = createComment(replies[i]);
        var parentId = replies[i].Reply;
        var parentDiv = document.getElementById(parentId);

        // Check if a container doesn't already exist for this comment, if not, make one
        var container;
        if (!document.getElementById(parentId + '-replies')) {
            container = document.createElement('div');
            container.id = parentId + '-replies';
            if (s_collapsedReplies) { container.style.display = 'none' } // Default to hidden if collapsed
            container.className = 'c-replyContainer';
            parentDiv.appendChild(container);
        } else { container = document.getElementById(parentId + '-replies') }
        reply.className = 'c-reply';
        container.appendChild(reply);
    }

    // Handle adding the buttons to show or hide replies if collapsed replies are enabled
    if (s_collapsedReplies) {
        var containers = document.getElementsByClassName('c-replyContainer');
        for (i = 0; i < containers.length; i++) {
            var num = containers[i].childNodes.length;
            var parentDiv = containers[i].parentElement;

            // The button to expand replies
            var button = document.createElement('button');
            button.innerHTML = s_expandRepliesText + ` (${num})`;
            button.setAttribute('onclick', `expandReplies(this.parentElement.id)`);
            button.className = 'c-expandButton';
            parentDiv.insertBefore(button, parentDiv.lastChild);
        }
    }

    // Handle pagination if there's more than one page
    if (v_amountOfPages > 1) {
        var pagination = document.createElement('div');

        leftButton = document.createElement('button');
        leftButton.innerHTML = s_leftButtonText; leftButton.id = 'c_leftButton'; leftButton.name = 'left';
        leftButton.setAttribute('onclick', `changePage(this.name)`);
        if (v_pageNum == 1) { leftButton.disabled = true } // Can't go before page 1
        leftButton.className = 'c-paginationButton';
        pagination.appendChild(leftButton);

        rightButton = document.createElement('button');
        rightButton.innerHTML = s_rightButtonText; rightButton.id = 'c_rightButton'; rightButton.name = 'right';
        rightButton.setAttribute('onclick', `changePage(this.name)`);
        if (v_pageNum == v_amountOfPages) { rightButton.disabled = true } // Can't go after the last page
        rightButton.className = 'c-paginationButton';
        pagination.appendChild(rightButton);

        pagination.id = 'c_pagination';
        c_container.appendChild(pagination);
    }
}

// Create basic HTML comment, reply or not
function createComment(data) {
    var comment = document.createElement('div');

    // Get the right timestamps
    var timestamps = convertTimestamp(data.Timestamp);
    var timestamp;
    if (s_longTimestamp) { timestamp = timestamps[0] }
    else { timestamp = timestamps[1] }

    // Set the ID (uses Name + Full Timestamp format)
    var id = data.Name + '|--|' + data.Timestamp2;
    comment.id = id;

    // Name of user
    var name = document.createElement('h2');
    var filteredName = data.Name;
    if (s_wordFilterOn) { filteredName = filteredName.replace(v_filteredWords, s_filterReplacement) }
    name.innerText = filteredName;
    name.className = 'c-name';
    if (data.Admin == true) {
        name.insertAdjacentHTML('beforeend', " <span class='c-admin'>[Admin]</span> ");
    }
    comment.appendChild(name);

    // Timestamp
    var time = document.createElement('span');
    time.innerText = timestamp;
    time.className = 'c-timestamp';
    comment.appendChild(time);

    // Website URL, if one was provided
    if (data.Website) {
        var site = document.createElement('a');
        site.innerText = s_websiteText;
        site.href = data.Website;
        site.className = 'c-site';
        comment.appendChild(site);
    }

    // Text content
    var text = document.createElement('p');
    var filteredText = data.Text;
    if (s_wordFilterOn) { filteredText = filteredText.replace(v_filteredWords, s_filterReplacement) }
    text.innerHTML = DOMPurify.sanitize(filteredText, { FORBID_TAGS: ['style'] });
    text.className = 'c-text';
    comment.appendChild(text);

    return comment;
}

// Makes the Google Sheet timestamp usable
function convertTimestamp(timestamp) {
    var vals = timestamp.split('(')[1].split(')')[0].split(',');
    var date = new Date(vals[0], vals[1], vals[2], vals[3], vals[4], vals[5]);
    var timezoneDiff = (s_timezone * 60 + date.getTimezoneOffset()) * -1;
    var offsetDate = new Date(date.getTime() + timezoneDiff * 60 * 1000);
    if (s_daylightSavings) { offsetDate = isDST(offsetDate) }
    return [offsetDate.toLocaleString(), offsetDate.toLocaleDateString()];
}
// DST checker
function isDST(date) {
    var dstStart = [getMonthNum(s_dstStart[0]), getDayNum(s_dstStart[1]), s_dstStart[2], s_dstStart[3]];
    var dstEnd = [getMonthNum(s_dstEnd[0]), getDayNum(s_dstEnd[1]), s_dstEnd[2], s_dstEnd[3]];

    var year = date.getFullYear();
    var startDate = new Date(year, dstStart[0], 1);
    startDate = nthDayOfMonth(dstStart[1], dstStart[2], startDate, dstStart[3]).getTime();
    var endDate = new Date(year, dstEnd[0], 1);
    endDate = nthDayOfMonth(dstEnd[1], dstEnd[2], endDate, dstEnd[3]).getTime();
    time = date.getTime();

    if (time >= startDate && time < endDate) { date.setHours(date.getHours() - 1) }
    return date;
}
// Thank you to https://stackoverflow.com/questions/32192982/get-a-given-weekday-in-a-given-month-with-javascript for the below function
function nthDayOfMonth(day, n, date, hour) {
    var count = 0;
    var idate = new Date(date);
    idate.setDate(1);
    while ((count) < n) {
        idate.setDate(idate.getDate() + 1);
        if (idate.getDay() == day) {
            count++;
        }
    }
    idate.setHours(hour);
    return idate;
}
// Convert weekday and month names into numbers
function getDayNum(day) {
    var num;
    switch (day.toLowerCase()) {
        case 'sunday': num = 0; break;
        case 'monday': num = 1; break;
        case 'tuesday': num = 2; break;
        case 'wednesday': num = 3; break;
        case 'thursday': num = 4; break;
        case 'friday': num = 5; break;
        case 'saturday': num = 6; break;
        default: num = 0; break;
    }
    return num;
}
function getMonthNum(month) {
    var num;
    switch (month.toLowerCase()) {
        case 'january': num = 0; break;
        case 'february': num = 1; break;
        case 'march': num = 2; break;
        case 'april': num = 3; break;
        case 'may': num = 4; break;
        case 'june': num = 5; break;
        case 'july': num = 6; break;
        case 'august': num = 7; break;
        case 'september': num = 8; break;
        case 'october': num = 9; break;
        case 'november': num = 10; break;
        case 'december': num = 11; break;
    }
    return num;
}

// Handle making replies
var link = document.createElement('a');
link.href = '#c_inputDiv';
function openReply(id) {
    if (c_replyingText.style.display == 'none') {
        c_replyingText.innerHTML = s_replyingText + ` ${id.split('|--|')[0]}...`;
        c_replyInput.value = id;
        c_replyingText.style.display = 'block';
    } else {
        c_replyingText.innerHTML = '';
        c_replyInput.value = '';
        c_replyingText.style.display = 'none';
    }
    link.click(); // Jump to the space to type
}

// Handle expanding replies (should only be accessible with collapsed replies enabled)
function expandReplies(id) {
    var targetDiv = document.getElementById(`${id}-replies`);
    if (targetDiv.style.display == 'none') { targetDiv.style.display = 'block' }
    else { targetDiv.style.display = 'none' }
}

function changePage(dir) {
    var leftButton = document.getElementById('c_leftButton');
    var rightButton = document.getElementById('c_rightButton');

    // Find directional number
    var num;
    switch (dir) {
        case 'left': num = -1; break;
        case 'right': num = 1; break;
        default: num = 0; break;
    }
    var targetPage = v_pageNum + num;

    // Cancel if impossible direction for safety, should never happen though
    if (targetPage > v_amountOfPages || targetPage < 1) { return }

    // Enable/disable buttons if needed
    leftButton.disabled = false; rightButton.disabled = false;
    if (targetPage == 1) { leftButton.disabled = true } // Can't go before page 1
    if (targetPage == v_amountOfPages) { rightButton.disabled = true } // Can't go past the last page

    // Hide all comments and then display the correct ones
    v_pageNum = targetPage;
    v_commentMax = s_commentsPerPage * v_pageNum;
    v_commentMin = v_commentMax - s_commentsPerPage;
    for (i = 0; i < a_commentDivs.length; i++) {
        a_commentDivs[i].style.display = 'none';
        if (i >= v_commentMin && i < v_commentMax) { a_commentDivs[i].style.display = 'block' }
    }
}

getComments(); // Run once on page load

document.addEventListener("astro:page-load", () => {
    setTimeout(() => getComments(), 1500)
})