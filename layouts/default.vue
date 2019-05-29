<script lang="tsx">
import { VNode } from 'vue';
import * as tsx from 'vue-tsx-support';
import NavBar from '../components/NavBar.vue';

export default tsx.component({
  render(): VNode {
    return (
      <div class="container">
        <NavBar />
        <nuxt />
      </div>
    );
  },
});
</script>

<style>
.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
