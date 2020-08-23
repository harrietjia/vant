import { addUnit, createNamespace } from '../utils';
import Badge from '../badge';

const [createComponent, bem] = createNamespace('icon');

function isImage(name) {
  return name ? name.indexOf('/') !== -1 : false;
}

export default createComponent({
  props: {
    dot: Boolean,
    name: String,
    size: [Number, String],
    badge: [Number, String],
    color: String,
    tag: {
      type: String,
      default: 'i',
    },
    classPrefix: {
      type: String,
      default: bem(),
    },
  },

  setup(props, { slots }) {
    return () => {
      const { tag, dot, name, size, badge, color, classPrefix } = props;
      const isImageIcon = isImage(name);

      return (
        <tag
          class={[classPrefix, isImageIcon ? '' : `${classPrefix}-${name}`]}
          style={{
            color,
            fontSize: addUnit(size),
          }}
        >
          {slots.default?.()}
          {isImageIcon && <img class={bem('image')} src={name} />}
          <Badge dot={dot} badge={badge} />
        </tag>
      );
    };
  },
});
