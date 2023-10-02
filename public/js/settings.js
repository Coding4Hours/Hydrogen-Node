// start of password protection
if (getPassword() == null) {
    
} else {
    openPage('password');
    document.getElementById('sidebar').style.display = 'none';
}

function getPassword() {
    return localStorage.getItem('password') || null;
}

function setPassword() {
    const $password = document.getElementById('password-set');
    const password = $password.value;
    if (password == null || password == '') {
        alert('Removed password');
        localStorage.removeItem('password');
        return;
    }
    if (confirm("Are you sure you want to password protect this page? If you do, you will not be able to access this page without the password. If you do not want to password protect this page, click cancel.") == true) {
        localStorage.setItem('password', password);
    }
}

function checkPassword() {
    const $password = document.getElementById('password-prompt');
    const password = $password.value;
    if (password == getPassword()) {
        openPage('home');
        document.getElementById('sidebar').style.display = 'flex';
    } else {
        window.location.href = getSearchEngineURL();
    }
}

function togglePassword() {
    var x = document.getElementById("passwordToggle");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

// end of password protection
  

// open url function
function openURL(url) {
    window.navigator.serviceWorker
    .register("./uv.js", {
      scope: __uv$config.prefix,
    })
    .then(() => {
      if (!isUrl(url)) url = getSearchEngineURL() + url;
      else if (!(url.startsWith("https://") || url.startsWith("http://")))
        url = "http://" + url;

      if (getAboutBlank() === 'on') {
        openAboutBlank(window.location.href.slice(0, -1) + __uv$config.prefix + __uv$config.encodeUrl(url));
      } else {
        window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
      }
    });
};

selectedIcon('icon-home');

setupCloak();

if (getAboutBlank() === 'on') {
    openPage('search');
    selectedIcon('icon-search');
}

setupCustomShortcut();

// Start of about:blank functions

function getAboutBlank() {
    if (localStorage.getItem('aboutBlank') === 'on') {
        var introText = document.getElementById("introText");
        introText.innerHTML = "<b>Elixir:</b><br>Search the web without censorship or tracking.</a>"

        var searchPlaceholder = document.querySelector("input");
        searchPlaceholder.placeholder = "Search here without tracking";

        return 'on';
    } else {
        return 'off';
    }
}

// Opens page in a new about:blank tab
function setAboutBlank() {
    const $aboutBlankSelect = document.getElementById('aboutBlankSelect');
    const aboutBlankSelect = $aboutBlankSelect.value;
    if (aboutBlankSelect === 'on') {
        localStorage.setItem('aboutBlank', 'on');
        openAboutBlank();
    } else if (aboutBlankSelect === 'off') {
        localStorage.setItem('aboutBlank', 'off');
    }
}

// opens page in about:blank
function openAboutBlank(url) {
    if (url === undefined) {
      var encoded_url = window.location.origin;
    }
    else {
      var encoded_url = url;
    }
    var w = open('about:blank', '_blank') || alert("It seems like you are blocking pop-ups. Please try again once you have allowed pop-ups.")
      w.document.write(`<iframe style="height: 100%; width: 100%; border: none;" src="${encoded_url}" allowfullscreen></iframe>`)
      w.document.body.style.margin = '0'
    window.location.replace(getSearchEngineURL()); 
}
// end of about:blank functions

// changes the selected icon
function selectedIcon(icon) {
    const icons = document.querySelectorAll(`[id^="icon"]`);
    icons.forEach(element =>{
        element.classList.remove('sidebar-icon-selected');
    });
    document.getElementById(icon).classList.toggle('sidebar-icon-selected')
}

// sets the custom shortcut
function setCustomShortcut() {
    const $shortcutURL = document.getElementById('shortcutURL');
    const $shortcutLogo = document.getElementById('shortcutLogo');

    if ($shortcutURL.value === '' && $shortcutLogo.value === '') {
        alert('Cleared custom shortcut');
        localStorage.removeItem('shortcutURL');
        localStorage.removeItem('shortcutLogo');
        setupCustomShortcut();
    } else if ($shortcutURL.value === '' || $shortcutLogo.value === '') {
        alert('Please fill out both fields');
    } else {
        if ($shortcutURL.value.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi)) {
            localStorage.setItem('shortcutURL', $shortcutURL.value);
            localStorage.setItem('shortcutLogo', $shortcutLogo.value.charAt(0));
            alert('Shortcut set!');
            setupCustomShortcut();
        } else {
            alert('Please enter a valid URL');
        }
    }
}

// changes the text on the custom shortcut and changes the onclick function to open the shortcut url
function setupCustomShortcut() {
    if (localStorage.getItem('shortcutURL') != null) {
        document.getElementById('customShortcutIcon').innerHTML = localStorage.getItem('shortcutLogo');
        document.getElementById('customShortcutDiv').onclick = function() {openURL(localStorage.getItem('shortcutURL'))};
    }
}

// sets the cloak
function setCloak() {
    const $cloakTitle = document.getElementById('cloakTitle');
    const $cloakFavicon = document.getElementById('cloakFavicon');

    if ($cloakTitle.value === '' && $cloakFavicon.value === '') {
        alert('Cleared cloak');
        localStorage.removeItem('cloakTitle');
        localStorage.removeItem('cloakFavicon');
    } else if ($cloakTitle.value === '' && $cloakFavicon.value != '') {
        if ($cloakFavicon.value.match(/(https?:\/\/).*/gi)) {
            localStorage.setItem('cloakFavicon', $cloakFavicon.value);
        }
    } else if ($cloakTitle.value != '' && $cloakFavicon.value === '') {
        localStorage.setItem('cloakTitle', $cloakTitle.value);
    } else {
        localStorage.setItem('cloakTitle', $cloakTitle.value);
        if ($cloakFavicon.value.match(/(https?:\/\/).*/gi)) {
            localStorage.setItem('cloakFavicon', $cloakFavicon.value);
        } else {
            alert('Please enter a valid URL like: https://example.com/favicon.ico');
        }
    }
    setupCloak();
}

// changes the text on the custom shortcut and changes the onclick function to open the shortcut url
function setupCloak() {
    if (localStorage.getItem('cloakTitle') != null) {
        document.title = localStorage.getItem('cloakTitle');
    }
    if (localStorage.getItem('cloakFavicon') != null) {
        changeFavicon(localStorage.getItem('cloakFavicon'));
    }
    if (localStorage.getItem('cloakTitle') == null && localStorage.getItem('cloakFavicon') == null) {
        document.title = 'Elixir - Blazingly Fast Math Help!';
        changeFavicon('favicon.ico');
    }
}

// changes the favicon
function changeFavicon(src) {
    var link = document.createElement('link'),
        oldLink = document.getElementById('dynamic-favicon');
    link.id = 'dynamic-favicon';
    link.rel = 'shortcut icon';
    link.href = src;
    if (oldLink) {
     document.head.removeChild(oldLink);
    }
    document.head.appendChild(link);
   }
   
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(window.location.origin + "/js/sw.js");
  }
