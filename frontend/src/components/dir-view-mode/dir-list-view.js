import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import DirentNoneView from '../../components/dirent-list-view/dirent-none-view';
import RepoInfoBar from '../../components/repo-info-bar';
import DirentListView from '../../components/dirent-list-view/dirent-list-view';

const propTypes = {
  path: PropTypes.string.isRequired,
  repoID: PropTypes.string.isRequired,
  currentRepoInfo: PropTypes.object.isRequired,
  isGroupOwnedRepo: PropTypes.bool.isRequired,
  enableDirPrivateShare: PropTypes.bool.isRequired,
  isRepoInfoBarShow: PropTypes.bool.isRequired,
  usedRepoTags: PropTypes.array.isRequired,
  readmeMarkdown: PropTypes.object,
  draftCounts: PropTypes.number,
  updateUsedRepoTags: PropTypes.func.isRequired,
  isDirentListLoading: PropTypes.bool.isRequired,
  direntList: PropTypes.array.isRequired,
  showShareBtn: PropTypes.bool.isRequired,
  sortBy: PropTypes.string.isRequired,
  sortOrder: PropTypes.string.isRequired,
  sortItems: PropTypes.func.isRequired,
  onAddFolder: PropTypes.func.isRequired,
  onAddFile: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired,
  onItemSelected: PropTypes.func.isRequired,
  onItemDelete: PropTypes.func.isRequired,
  onItemRename: PropTypes.func.isRequired,
  onItemMove: PropTypes.func.isRequired,
  onItemCopy: PropTypes.func.isRequired,
  onDirentClick: PropTypes.func.isRequired,
  updateDirent: PropTypes.func.isRequired,
  isAllItemSelected: PropTypes.bool.isRequired,
  onAllItemSelected: PropTypes.func.isRequired,
  selectedDirentList: PropTypes.array.isRequired,
  onItemsMove: PropTypes.func.isRequired,
  onItemsCopy: PropTypes.func.isRequired,
  onItemsDelete: PropTypes.func.isRequired,
  onFileTagChanged: PropTypes.func,
};

class DirListView extends React.Component {
  
  render() {

    if (this.props.path === '/' && this.props.direntList.length === 0) {
      return (
        <DirentNoneView 
          path={this.props.path}
          isDirentListLoading={this.props.isDirentListLoading}
          onAddFile={this.props.onAddFile}
        />
      );
    }

    return (
      <Fragment>
        {this.props.isRepoInfoBarShow && (
          <RepoInfoBar 
            repoID={this.props.repoID}
            currentPath={this.props.path}
            readmeMarkdown={this.props.readmeMarkdown}
            draftCounts={this.props.draftCounts}
            usedRepoTags={this.props.usedRepoTags}
            updateUsedRepoTags={this.props.updateUsedRepoTags}
            onFileTagChanged={this.props.onFileTagChanged}
          />
        )}
        <DirentListView
          path={this.props.path}
          currentRepoInfo={this.props.currentRepoInfo}
          repoID={this.props.repoID}
          isGroupOwnedRepo={this.props.isGroupOwnedRepo}
          enableDirPrivateShare={this.props.enableDirPrivateShare}
          direntList={this.props.direntList}
          showShareBtn={this.props.showShareBtn}
          sortBy={this.props.sortBy}
          sortOrder={this.props.sortOrder}
          sortItems={this.props.sortItems}
          onAddFile={this.props.onAddFile}
          onItemClick={this.props.onItemClick}
          onItemSelected={this.props.onItemSelected}
          onItemDelete={this.props.onItemDelete}
          onItemRename={this.props.onItemRename}
          onItemMove={this.props.onItemMove}
          onItemCopy={this.props.onItemCopy}
          onDirentClick={this.props.onDirentClick}
          isDirentListLoading={this.props.isDirentListLoading}
          updateDirent={this.props.updateDirent}
          isAllItemSelected={this.props.isAllItemSelected}
          onAllItemSelected={this.props.onAllItemSelected}
          selectedDirentList={this.props.selectedDirentList}
          onItemsMove={this.props.onItemsMove}
          onItemsCopy={this.props.onItemsCopy}
          onItemsDelete={this.props.onItemsDelete}
          onAddFile={this.props.onAddFile}
          onAddFolder={this.props.onAddFolder}
          onFileTagChanged={this.props.onFileTagChanged}
        />
      </Fragment>
    );
  }
}

DirListView.propTypes = propTypes;

export default DirListView;
