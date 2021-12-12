// folders
const folderLinks = document.querySelectorAll('.folder-link');

if (folderLinks.length > 0) {
    for (let index = 0; index < folderLinks.length; index++) {
        const folderLink = folderLinks[index];
        folderLink.addEventListener("click", function (e) {
            const folderName = folderLink.getAttribute('href').replace('#', '');
            const currentFolder = document.getElementById(folderName);
            folderOpen(currentFolder);
            e.preventDefault();
        });
    }
}

function folderOpen (currentFolder) {
    if (currentFolder) {
        const folderActive = document.querySelector('.folder.open');
        currentFolder.classList.add('open');
        currentFolder.addEventListener('click', function (e) {
            if (!e.target.closest('.folder-container')) {
                folderClose(e.target.closest('.folder'));
            }
        });
    }
}

function folderClose (folderActive) {
    folderActive.classList.remove('open');
}

document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
        const folderActive = document.querySelector('.folder.open');
        folderClose(folderActive);
    }
});

// search
document.querySelector('#search').oninput = function () {
    let val = this.value.trim();
    let blocks = document.querySelectorAll('.block');
    let searchItems = document.querySelectorAll('.skinname');
    if (val != '') {
        blocks.forEach(function(block) {
            searchItems.forEach(function(item) {
                if (block.innerText.search(RegExp(val,"gi")) == -1) {
                    block.classList.add('hide');
                } else {
                    block.classList.remove('hide');
                }
            });
        });
    } else {
        blocks.forEach(function(block) {
            searchItems.forEach(function(item) {
                block.classList.remove('hide');
            });
        });
    }
}

// cursor
var lastPos = [[0, 0]],
  trailStarted = false,
  lastEvent = 0;

// Update array of past cursor positions
var updateTrail = (positions) => {
  positions.forEach((e, i, a) => {
    document.getElementById('trail' + (i + 1)).style.left = e[0] + 'px';
    document.getElementById('trail' + (i + 1)).style.top = e[1] + 'px';
  });
};
// Set last event so render function can push to array
document.addEventListener('mousemove', (e) => {
  lastEvent = e;
  if (!trailStarted) {
    renderTrail(e);
    trailStarted = true;
  }
});
// Render the trail using the new positions
var renderTrail = (e) => {
  lastPos.push([e.clientX, e.clientY]);
  if (lastPos.length > 10) {
    lastPos.shift();
  }
  updateTrail(lastPos);

  requestAnimationFrame(() => {
    renderTrail(lastEvent)
  });
};

// Create trail elements on page load
document.addEventListener('DOMContentLoaded', () => {
  for (var a = 1; a < 11; a++) {
    var elem = document.createElement('div');
    elem.id = 'trail' + a;
    elem.classList.add('trail');
    document.body.appendChild(elem);
  }
});