<template>
  <div id="footer">
    <div id="footernav">
      <ul class="nav justify-content-center">
      <li class="nav-item">
        <a class="nav-link" href="#">
          <router-link to="/question">
          <font-awesome-icon :icon="['fas', 'user-friends']"/>常見問題
          </router-link>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">
          <font-awesome-icon :icon="['fas', 'user-friends']"/>加入我們
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">
           <router-link to="/coopstore">
          <font-awesome-icon :icon="['fas', 'user-friends']"/>合作廠商
          </router-link>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">
          <router-link to="/contact">
          <font-awesome-icon :icon="['fas', 'user-friends']"/>
          意見反饋
          </router-link>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">
          <font-awesome-icon :icon="['fas', 'user-friends']"/>我要贊助
        </a>
      </li>

      <li class="nav-item">
        <a class="nav-link">
        <router-link to="/back">
          <font-awesome-icon :icon="['fas', 'user-friends']"/>
          登入後台
          </router-link>
        </a>
      </li>

    </ul>
    </div>

    <div id="footercontact" class="container">
      <div class="row">
        <div class="col-12 text-center">
          <h5>下載APP</h5>
          <a href="#"><font-awesome-icon :icon="['fab', 'apple']" class="icon"/></a>
          <br>
          <a href="#"><font-awesome-icon :icon="['fab', 'android']" class="icon"/></a>
        </div>
        <br>
        <br>
        <div class="col-12  text-center">
          <h5>在這裡可以找到我們</h5>
          <div class="findus">
      <ul class="nav justify-content-center">
      <li class="nav-item">
        <a class="nav-link" href="#">
          <font-awesome-icon :icon="['far', 'thumbs-up']" class="footericon" />
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">
          <font-awesome-icon :icon="['fab', 'instagram']" class="footericon" />
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">
          <font-awesome-icon :icon="['fab', 'github-alt']" class="footericon" />
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">
          <font-awesome-icon :icon="['far', 'handshake']" class="footericon" />
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">
          <font-awesome-icon :icon="['fas', 'envelope']" class="footericon" />
        </a>
      </li>
            <li class="nav-item">
        <a class="nav-link" href="#">
          <font-awesome-icon :icon="['fab', 'youtube']" class="footericon" />
        </a>
      </li>
    </ul>
          </div>
        </div>
      </div>
    </div>

    <div id="copyright" class="text-center">
      &copy;momo chi 2020/08
    </div>
  </div>
</template>
