import { useState, useRef, useId, type ElementType } from 'react';
import { useFloating, FloatingPortal, arrow, shift, offset } from '@floating-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  renderPopover: React.ReactNode;
  className?: string;
  as?: ElementType;
  initialOpen?: boolean;
}

const Popover = ({ children, className, renderPopover, as: Element = 'div', initialOpen }: Props) => {
  const id = useId();
  const arrowRef = useRef<HTMLElement>(null);
  const { x, y, refs, strategy, middlewareData } = useFloating({
    middleware: [offset(6), shift(), arrow({ element: arrowRef })],
  });

  const [open, setOpen] = useState(initialOpen || false);

  const showPopover = () => {
    setOpen(true);
  };

  const hidePopover = () => {
    setOpen(false);
  };

  return (
    <Element className={className} ref={refs.setReference} onMouseEnter={showPopover} onMouseLeave={hidePopover}>
      {children}
      <FloatingPortal id={id}>
        <AnimatePresence>
          {open && (
            <motion.div
              ref={refs.setFloating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                width: 'max-content',
                transformOrigin: `${middlewareData.arrow?.x}px top`,
              }}
              initial={{ opacity: 0, transform: 'scale(0)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
              transition={{ duration: 0.2 }}
            >
              <span
                ref={arrowRef}
                className='absolute z-10 translate-y-[-95%] border-[11px] border-x-transparent border-b-white border-t-transparent'
                style={{
                  left: middlewareData.arrow?.x,
                  top: middlewareData.arrow?.y,
                }}
              />
              {renderPopover}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </Element>
  );
};

export default Popover;
