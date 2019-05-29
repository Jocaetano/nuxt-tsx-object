<script lang="tsx">
import * as tsx from 'vue-tsx-support';
import Logo from '../components/Logo.vue';
import { Post } from '../store/posts';

export default tsx.component({
  computed: {
    posts(): Post[] {
      return this.$store.state.posts.all;
    },
  },

  head() {
    return { title: 'Home Page' };
  },

  render() {
    return (
      <section class="container">
        <div>
          <Logo />
          <h1 class="title">nuxt</h1>
          <h2 class="subtitle">My super-duper Nuxt.js project</h2>
          <div class="links">
            {this.posts.map((post) => (
              <nuxt-link
                to={{ name: 'posts-id', params: { id: post.id } }}
                key={post.id}
                class={'button--grey'}
              >
                {post.title}
              </nuxt-link>
            ))}
          </div>
        </div>
      </section>
    );
  },
});
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  letter-spacing: 1px;
}
.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
}
.links {
  padding-top: 15px;
}
</style>
