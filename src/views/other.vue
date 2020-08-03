
  <b-table-simple class="col-12 col-md-6 col-lg-4" striped hover responsive v-for="(likecase, idx) in likecases" :key="idx">
          <div class="likediv">
          <tr>收藏提案： {{ likecase.title }} </tr>
          <td>
            類型：{{ likecase.type }} <br>
            預算：{{ likecase.budget }} <br>
            詳情：{{ likecase.description }}  <br>
            提案時間：{{ likecase.date }}
          </td>
          <b-btn variant="warning" @click="remove(likecase, idx)" class="removebtn">移除</b-btn>
          </div>
          </b-table-simple>

<div class="row">
    <b-card-group deck class="row">
      <b-card class="" striped hover responsive v-for="(selfcase, idx) in selfcases" :key="idx" style="margin-bottom:2rem;">
        <template v-slot:header>
          <p>{{ selfcase.title }}</p>
        </template>
        <b-card-text>
            類型：{{ selfcase.type }} <br>
            預算：{{ selfcase.budget }} <br>
            詳情：{{ selfcase.description }}  <br>
            提案時間：{{ selfcase.date }}
        </b-card-text>
          <b-btn variant="danger" @click="del(selfcase, idx)" class="removebtn">刪除</b-btn>
      </b-card>
    </b-card-group>
  </div>
