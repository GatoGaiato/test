let i = 0;

function timedCount() {
  let i =+ 1;
  postMessage(i);
  setTimeout("timedCount()",500);
}

timedCount()