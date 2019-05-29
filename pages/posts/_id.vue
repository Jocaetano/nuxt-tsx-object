<script lang="tsx">
import { VNode } from 'vue';
import * as tsx from 'vue-tsx-support';
import { Post } from '../../store/posts';

export default tsx.component({
  data() {
    return {
      id: this.$route.params.id,
    };
  },

  computed: {
    post(): Post {
      return this.$store.state.posts.all.find((p) => p.id === this.id);
    },
    relatedPosts(): Post[] {
      return this.$store.state.posts.all.filter((p) => p.id !== this.id);
    },
  },

  head() {
    return {
      title: this.post.title,
    };
  },

  render(): VNode {
    if (!this.post) {
      return <div />;
    }

    return (
      <div class="container">
        <article>
          <h1 class="title">{this.post.title}</h1>
          <p>{this.post.content}</p>
        </article>
        <aside>
          <h3>Posts you might enjoy</h3>
          <ul>
            {this.relatedPosts.map((related) => (
              <li>
                <nuxt-link
                  to={{ name: 'posts-id', params: { id: related.id } }}
                >
                  {related.title}
                </nuxt-link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    );
  },
});
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  line-height: 1.5;
}
article * {
  margin-bottom: 1rem;
}
aside {
  min-width: 280px;
  max-width: 280px;
  padding-left: 2rem;
}
.title {
  font-size: 2rem;
}
</style>
