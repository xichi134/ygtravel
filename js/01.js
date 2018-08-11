 window.onload = function () {
            var timer = null;
            var isTop = true;
            var go_top = document.getElementById('go_top');
            window.onscroll = function () {
            var h = window.document.body.scrollHeight || window.document.documentElement.scrollHeight;
            var clientHeight = window.document.body.clientHeight || window.document.documentElement.clientHeight;
                if (h >= clientHeight) {
                    go_top.style.display = 'block';
                } else {
                    go_top.style.display = 'none';
                }

                if (!isTop) {
                    if (timer != null) {
                        clearInterval(timer);
                    }
                }
                isTop = false;
            }

            go_top.onclick = function () {
                timer = setInterval(function () {
                    var h = window.document.body.scrollTop || window.document.documentElement.scrollTop;
                    h = (h / 4);
                    window.document.body.scrollTop -= h;
                    window.document.documentElement.scrollTop -= h;

                    if (h <= 0) {
                        clearInterval(timer);
                        go_top.style.display = 'none';
                    }
                    isTop = true;
                }, 50);
            };
        }