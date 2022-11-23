<script lang="ts">
  function portal(node: HTMLElement) {
    let target: HTMLBodyElement | null;

    function update() {
      // assign `body` to target if it's not already assigned
      target = document.querySelector('body');
      target?.appendChild(node);
      node.hidden = false;
    }

    function destroy() {
      // parent node is `body` so we can just remove the node
      if (node.parentNode) {
        node.parentNode.removeChild(node);
      }
    }
    update();
    return { update, destroy };
  }

  // function portal (node: HTMLElement) {
  //   document.body.appendChild(node);
  //   return {
  //     destroy () {
  //       node.remove();
  //     }
  //   };
  // }
</script>

<div hidden use:portal>
  <slot><!-- optional fallback --></slot>
</div>
