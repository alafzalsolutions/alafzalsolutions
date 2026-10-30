// Turns :::tip, :::warning and :::definition blocks into styled callouts.
// Writers can add their own label: :::tip[Study tip]
const KINDS = {
  tip: 'Quick tip',
  warning: 'Be careful',
  definition: 'In plain words',
};

const textOf = (n) =>
  n.children ? n.children.map(textOf).join('') : (n.value ?? '');

function makeCallout(node) {
  let label = KINDS[node.name];
  const first = node.children[0];
  if (first && first.data && first.data.directiveLabel) {
    label = textOf(first);
    node.children.shift();
  }
  node.children.unshift({
    type: 'paragraph',
    data: { hName: 'p', hProperties: { className: ['callout-label'] } },
    children: [{ type: 'text', value: label }],
  });
  node.data = {
    hName: 'aside',
    hProperties: {
      className: ['callout', `callout-${node.name}`],
      'aria-label': label,
    },
  };
}

function walk(node) {
  if (!node.children) return;
  node.children.forEach((child, i) => {
    if (child.type === 'containerDirective' && KINDS[child.name]) {
      makeCallout(child);
    } else if (
      (child.type === 'textDirective' || child.type === 'leafDirective') &&
      !(child.children && child.children.length) &&
      !(child.attributes && Object.keys(child.attributes).length)
    ) {
      // Plain text like ":something" must stay visible, not vanish.
      if (child.type === 'leafDirective') {
        node.children[i] = {
          type: 'paragraph',
          children: [{ type: 'text', value: `::${child.name}` }],
        };
      } else {
        node.children[i] = { type: 'text', value: `:${child.name}` };
      }
      return;
    }
    walk(child);
  });
}

export default function remarkCallouts() {
  return (tree) => walk(tree);
}