import Components, { getState } from "@components";
import { useEffect, useState } from "react";

function getContentBetweenCurlyBraces(inputString) {
  const pattern = /\{\{(.*?)\}\}/g;
  const matches = [];
  let match;
  while ((match = pattern.exec(inputString))) {
    matches.push(match[1]);
  }
  return matches;
}

function Template({ Component, template, ...props }) {
  const [classNAME, setClassNAME] = useState(template?.__props?.className);
  const [text, setText] = useState(template?.__props?.text);
  const [pre, setPre] = useState(template?.__props?.pre);
  const [title, setTitle] = useState(template?.__props?.title);

  const handle = () => {
    if (template?.__props?.className) {
      const scripts = getContentBetweenCurlyBraces(
        template?.__props?.className
      );
      let classNames = template.__props.className.replace(/{{.*?}}/g, "");
      for (let item of scripts) {
        classNames += `${Function(`
                            const [getState] = arguments;
                            return ${item} ;
                        `)(getState)} `;
      }
      setClassNAME(classNames);
    }

    if (template?.__props?.text) {
      const scripts = getContentBetweenCurlyBraces(template?.__props?.text);
      let texts = template.__props.text.replace(/{{.*?}}/g, "");
      for (let item of scripts) {
        texts += `${Function(`
                              const [getState] = arguments;
                              return ${item} ;
                          `)(getState)} `;
      }
      setText(texts);
    }

    if (template?.__props?.pre) {
      const scripts = getContentBetweenCurlyBraces(template?.__props?.pre);
      let texts = template.__props.pre.replace(/{{.*?}}/g, "");
      for (let item of scripts) {
        texts += `${Function(`
                                const [getState] = arguments;
                                return ${item} ;
                            `)(getState)} `;
      }
      setPre(texts);
    }

    if (template?.__props?.title) {
      const scripts = getContentBetweenCurlyBraces(template?.__props?.title);
      let texts = template.__props.title.replace(/{{.*?}}/g, "");
      for (let item of scripts) {
        texts += `${Function(`
                                  const [getState] = arguments;
                                  return ${item} ;
                              `)(getState)} `;
      }
      setTitle(texts);
    }
  };

  useEffect(() => {
    if (!window.States) return;
    window.States.onUpdateListener(handle);
    handle();
  }, [template]);

  return (
    <Component
      {...props}
      pre={pre}
      text={text}
      title={title}
      className={classNAME}
    />
  );
}

export function BuildBody({ template, links, medialinks, functions, resolve }) {
  if (Array.isArray(template))
    return (
      <>
        {template.map((item, index) => (
          <BuildBody
            functions={functions}
            key={index}
            links={links}
            medialinks={medialinks}
            template={item}
            {...item}
            resolve={resolve}
          />
        ))}
      </>
    );
  const C = Components[template?.__component];

  return (
    <>
      {C && (
        <Template
          Component={C}
          {...template.__props}
          functions={functions}
          links={links}
          medialinks={medialinks}
          template={template}
          resolve={resolve}
          children={BuildBody({
            template: template.children,
            links,
            medialinks,
            functions,
            resolve,
          })}
        />
      )}
    </>
  );
}
