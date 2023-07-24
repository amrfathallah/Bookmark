var bookmarkNameInput = document.getElementById("bookmarkName");
var bookmarkUrlInput = document.getElementById("bookmarkURL");
var message = document.getElementById("box-info");

var bookmarkContainer = [];

if (localStorage.getItem("bookmarks") != null) {
  bookmarkContainer = JSON.parse(localStorage.getItem("bookmarks"));
  displaybookmark();
}

function clearForm() {
  bookmarkNameInput.value = "";
  bookmarkUrlInput.value = "";
  bookmarkNameInput.classList.remove("is-valid");
  bookmarkNameInput.classList.remove("is-invalid");
  bookmarkUrlInput.classList.remove("is-valid");
  bookmarkUrlInput.classList.remove("is-invalid");
}

function addbookmark() {
  if (validitionName() == true && validitionUrl() == true) {
    var bookmark = {
      name: bookmarkNameInput.value,
      url: bookmarkUrlInput.value,
    };
    var isBookmarkExists = bookmarkContainer.some(function (item) {
      return item.name === bookmark.name;
    });

    if (isBookmarkExists) {
      message.classList.remove("d-none");
      message.classList.add("d-block");

      return;
    }
    bookmarkContainer.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarkContainer));

    displaybookmark();
    clearForm();
  } else {
    message.classList.remove("d-none");
    message.classList.add("d-block");
  }
}

function displaybookmark() {
  var box = "";

  for (var i = 0; i < bookmarkContainer.length; i++) {
    box += `
    <tr>
              <td>${i + 1}</td>
              <td> ${bookmarkContainer[i].name} </td>
              <td>
                <button class="btn btn-visit">
                  <a
                    href="${bookmarkContainer[i].url}"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i class="fa-solid fa-eye pe-2"></i>Visit
                  </a>
                </button>
              </td>
              <td>
                <button class="btn btn-delete pe-2" onclick="deleteBookmark(${i})">
                  <i class="fa-solid fa-trash-can"></i> Delete
                </button>
              </td>
            </tr>
    `;
  }
  document.getElementById("tableData").innerHTML = box;
}

function deleteBookmark(elementNum) {
  bookmarkContainer.splice(elementNum, 1);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarkContainer));
  displaybookmark();
}

// validition

function validitionName() {
  var regex = /^\w{3,}(\s+\w+)*$/;
  var text = bookmarkNameInput.value;
  var isDuplicate = bookmarkContainer.some(function (item) {
    return item.name === text;
  });

  if (isDuplicate) {
    bookmarkNameInput.classList.add("is-invalid");
    bookmarkNameInput.classList.remove("is-valid");
    return false;
  } else if (regex.test(text)) {
    bookmarkNameInput.classList.add("is-valid");
    bookmarkNameInput.classList.remove("is-invalid");
    return true;
  } else {
    bookmarkNameInput.classList.add("is-invalid");
    bookmarkNameInput.classList.remove("is-valid");
    return false;
  }
}
function validitionUrl() {
  var regexUrl = /^(www\.|http:\/\/|https:\/\/)[^\s]{2,}[\w]$/;
  var textUrl = bookmarkUrlInput.value;

  if (regexUrl.test(textUrl)) {
    bookmarkUrlInput.classList.add("is-valid");
    bookmarkUrlInput.classList.remove("is-invalid");
    return true;
  } else {
    bookmarkUrlInput.classList.add("is-invalid");
    bookmarkUrlInput.classList.remove("is-valid");
    return false;
  }
}

function closeBtn() {
  message.classList.add("d-none");
  message.classList.remove("d-block");
}
