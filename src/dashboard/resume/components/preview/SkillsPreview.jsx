import React from 'react';

/**
 * A flexible skills preview component that adapts to different data structures.
 *
 * To use the "Categorized List" style (like Sushrut Athawale's resume),
 * your resumeInfo.skills data should be an array of objects, where each object has:
 * - category: A string for the heading (e.g., 'Languages').
 * - skillList: A string of skills, separated by commas (e.g., 'C++, JavaScript, HTML').
 *
 * Example:
 * skills: [
 * { category: 'Languages', skillList: 'C/C++, JavaScript, SQL' },
 * { category: 'Frameworks', skillList: 'React, Node.js, Express' }
 * ]
 *
 * To use the "Flowing List" style (like PIRATE KING's resume),
 * your resumeInfo.skills data should be an array of objects where each object has:
 * - name: The skill name. The component will join them with a '|'.
 * - (optional) rating: This will be ignored in the new display logic.
 *
 * Example:
 * skills: [
 * { name: 'JavaScript' }, { name: 'React' }, { name: 'Node.js' }, { name: 'C++' }
 * ]
 */
const SkillsPreview = ({ resumeInfo }) => {
  // Check if the skills are categorized
  const isCategorized = resumeInfo?.skills && resumeInfo.skills.every(skill => skill.category && skill.skillList);

  return (
    <div className="my-4">
      {isCategorized ? (
        // Render a categorized list
        <div className="space-y-3">
          {resumeInfo.skills.map((item, index) => (
            <div key={index}>
              <h3 className="text-sm font-bold text-gray-800">{item.category}:</h3>
              <p className="text-xs text-gray-700 mt-1">{item.skillList}</p>
            </div>
          ))}
        </div>
      ) : (
        // Render a flowing, pipe-separated list
        <div className="flex flex-wrap items-center">
          {resumeInfo?.skills?.map((skill, index) => (
            <React.Fragment key={index}>
              <span className="text-xs font-medium text-gray-700">{skill.name}</span>
              {index < resumeInfo.skills.length - 1 && <span className="mx-2 text-gray-400">|</span>}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsPreview;

/*
import React from 'react'

function SkillsPreview({resumeInfo}) {
  return (
    <div className='my-6'>
    <h2 className='text-center font-bold text-sm mb-2'
    style={{
        color:resumeInfo?.themeColor
    }}
    >Skills</h2>
    <hr style={{
        borderColor:resumeInfo?.themeColor
    }} />

    <div className='grid grid-cols-2 gap-3 my-4'>
        {resumeInfo?.skills.map((skill,index)=>(
            <div key={index} className='flex items-center justify-between'>
                <h2 className='text-xs'>{skill.name}</h2>
                <div className='h-2 bg-gray-200 w-[120px]'>
                    <div className='h-2'
                        style={{
                            backgroundColor:resumeInfo?.themeColor,
                            width:skill?.rating*20+'%'
                        }}
                    >
                    </div>
                </div>
            </div>
        ))}
    </div>
    </div>
  )
}

export default SkillsPreview
*/
